-- =====================================================================
-- Sage Global Advisory — AI CMS + security hardening (2026-10-01)
-- Additive and idempotent: safe to run more than once. No data is deleted.
-- =====================================================================

-- ---------- Content document (whole site content tree as JSON) ----------
CREATE TABLE IF NOT EXISTS cms_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- Change history (powers Undo) ----------
CREATE TABLE IF NOT EXISTS cms_revisions (
  id BIGSERIAL PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('content', 'service', 'blog', 'media')),
  target_id TEXT NOT NULL,
  path TEXT,
  before JSONB,
  after JSONB,
  summary TEXT,
  source TEXT NOT NULL DEFAULT 'editor' CHECK (source IN ('chat', 'editor', 'undo')),
  conversation_id UUID,
  actor TEXT,
  reverted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cms_revisions_created ON cms_revisions (created_at DESC);

-- ---------- Media library ----------
CREATE TABLE IF NOT EXISTS cms_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  mime TEXT NOT NULL,
  width INT,
  height INT,
  bytes INT,
  source TEXT NOT NULL CHECK (source IN ('upload', 'generated', 'edited')),
  prompt TEXT,
  parent_ids UUID[] NOT NULL DEFAULT '{}',
  description TEXT,
  alt_en TEXT NOT NULL DEFAULT '',
  alt_ar TEXT NOT NULL DEFAULT '',
  original_name TEXT,
  created_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cms_media_created ON cms_media (created_at DESC);

-- ---------- Chat agent: conversations, messages, long-term memory ----------
CREATE TABLE IF NOT EXISTS cms_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'New conversation',
  summary TEXT,                         -- rolling summary of older messages / whole conversation
  summarized_count INT NOT NULL DEFAULT 0,  -- how many messages the summary covers
  message_count INT NOT NULL DEFAULT 0,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cms_conversations_updated ON cms_conversations (updated_at DESC);

CREATE TABLE IF NOT EXISTS cms_messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES cms_conversations (id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL DEFAULT '',
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,   -- [{ media_id, url }]
  actions JSONB NOT NULL DEFAULT '[]'::jsonb,       -- [{ label, revision_ids, media }]
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cms_messages_conv ON cms_messages (conversation_id, id);

CREATE TABLE IF NOT EXISTS cms_memory (
  id BIGSERIAL PRIMARY KEY,
  fact TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- Login throttling ----------
CREATE TABLE IF NOT EXISTS cms_login_attempts (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  success BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cms_login_attempts_key ON cms_login_attempts (key, created_at DESC);

-- ---------- Existing tables: new columns ----------
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_alt_en TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_alt_ar TEXT;

ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS privacy_version TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS locale TEXT;

-- ---------- Row Level Security ----------
-- All CMS writes now go through authenticated server routes using the service-role key,
-- so the database itself must not let browser sessions write anything.
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_login_attempts ENABLE ROW LEVEL SECURITY;
-- (No policies on cms_* tables = no access for anon/authenticated roles; service role bypasses RLS.)

-- Remove legacy policies that let ANY signed-in Supabase user (public sign-up is enabled!)
-- edit content or read contact-form submissions.
DO $$
DECLARE p RECORD;
BEGIN
  FOR p IN
    SELECT schemaname, tablename, policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('site_content', 'services', 'blog_posts', 'testimonials', 'faqs', 'contact_submissions', 'resources', 'site_settings')
      AND policyname LIKE 'Authenticated %'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', p.policyname, p.schemaname, p.tablename);
  END LOOP;
END $$;

-- Contact form inserts now go through /api/contact (service role) — no direct public inserts.
DROP POLICY IF EXISTS "Public INSERT contact_submissions" ON contact_submissions;

-- ---------- Storage bucket for CMS images (public read, server-only write) ----------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('cms-media', 'cms-media', TRUE, 10485760, ARRAY['image/webp'])
ON CONFLICT (id) DO UPDATE SET public = TRUE, file_size_limit = 10485760, allowed_mime_types = ARRAY['image/webp'];
