-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT UNIQUE PRIMARY KEY,
  value_en TEXT,
  value_ar TEXT,
  section TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tax', 'accounting', 'corporate')),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  long_description_en TEXT,
  long_description_ar TEXT,
  features JSONB DEFAULT '[]',
  flow_steps JSONB DEFAULT '[]',
  documents JSONB DEFAULT '[]',
  faqs JSONB DEFAULT '[]',
  meta_title_en TEXT,
  meta_title_ar TEXT,
  meta_description_en TEXT,
  meta_description_ar TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_ar TEXT,
  content_en TEXT,
  content_ar TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  source_url TEXT,
  source_name TEXT,
  is_auto_fetched BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  meta_title_en TEXT,
  meta_description_en TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_ar TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  category TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create resources table (government documents, external links, guides)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('government-document', 'law', 'guide', 'article', 'external-link', 'newsletter', 'whitepaper')),
  category TEXT CHECK (category IN ('vat', 'corporate-tax', 'excise-tax', 'golden-visa', 'company-registration', 'accounting', 'trademark', 'general')),
  url TEXT,
  document_url TEXT,
  icon_type TEXT DEFAULT 'auto' CHECK (icon_type IN ('auto', 'pdf', 'document', 'link', 'law', 'government', 'newsletter')),
  source_name TEXT,
  is_pinned BOOLEAN DEFAULT FALSE,
  pin_to_homepage BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes on commonly queried columns
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_resource_type ON resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_is_active ON resources(is_active);
CREATE INDEX IF NOT EXISTS idx_resources_is_pinned ON resources(is_pinned);
CREATE INDEX IF NOT EXISTS idx_resources_pin_to_homepage ON resources(pin_to_homepage);
CREATE INDEX IF NOT EXISTS idx_resources_sort_order ON resources(sort_order);

-- Create trigger functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for tables with updated_at columns
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_content
CREATE POLICY "Public SELECT site_content" ON site_content
    FOR SELECT USING (true);

CREATE POLICY "Authenticated INSERT site_content" ON site_content
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE site_content" ON site_content
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE site_content" ON site_content
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for services
CREATE POLICY "Public SELECT services" ON services
    FOR SELECT USING (true);

CREATE POLICY "Authenticated INSERT services" ON services
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE services" ON services
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE services" ON services
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for blog_posts
CREATE POLICY "Public SELECT published blog_posts" ON blog_posts
    FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated SELECT all blog_posts" ON blog_posts
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated INSERT blog_posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE blog_posts" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE blog_posts" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for testimonials
CREATE POLICY "Public SELECT active testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated SELECT all testimonials" ON testimonials
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated INSERT testimonials" ON testimonials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE testimonials" ON testimonials
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE testimonials" ON testimonials
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for faqs
CREATE POLICY "Public SELECT active faqs" ON faqs
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated SELECT all faqs" ON faqs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated INSERT faqs" ON faqs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE faqs" ON faqs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE faqs" ON faqs
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for contact_submissions
CREATE POLICY "Public INSERT contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated SELECT contact_submissions" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE contact_submissions" ON contact_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE contact_submissions" ON contact_submissions
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for resources
CREATE POLICY "Public SELECT active resources" ON resources
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated SELECT all resources" ON resources
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated INSERT resources" ON resources
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE resources" ON resources
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE resources" ON resources
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for site_settings
CREATE POLICY "Authenticated SELECT site_settings" ON site_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated INSERT site_settings" ON site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated UPDATE site_settings" ON site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated DELETE site_settings" ON site_settings
    FOR DELETE USING (auth.role() = 'authenticated');
