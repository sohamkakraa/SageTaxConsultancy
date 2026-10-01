/**
 * Runs the AI-CMS migration against the Supabase Postgres database and seeds service documents.
 * Usage: node scripts/cms-migrate.cjs   (reads POSTGRES_URL_NON_POOLING from .env.local)
 */
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function loadEnv() {
  const file = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

(async () => {
  loadEnv();
  const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!url) throw new Error('POSTGRES_URL_NON_POOLING is not set');
  const client = new Client({ connectionString: url.replace(/[?&]sslmode=[^&]*/, ''), ssl: { rejectUnauthorized: false } });
  await client.connect();

  const dir = path.join(__dirname, '..', 'supabase', 'migrations');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.sql')).sort()) {
    process.stdout.write(`Applying ${f} … `);
    await client.query(fs.readFileSync(path.join(dir, f), 'utf8'));
    console.log('ok');
  }

  // Seed required-document lists into services (they used to be hard-coded in the page).
  const docs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'supabase', 'service-documents.json'), 'utf8'));
  let seeded = 0;
  for (const [slug, list] of Object.entries(docs)) {
    const r = await client.query(
      `UPDATE services SET documents = $2::jsonb
       WHERE slug = $1 AND (documents IS NULL OR jsonb_array_length(documents) < jsonb_array_length($2::jsonb)
                            OR NOT (documents->0 ? 'name_en'))`,
      [slug, JSON.stringify(list)]
    );
    seeded += r.rowCount;
  }
  console.log(`Service document lists seeded: ${seeded}`);

  const pol = await client.query(`SELECT tablename, policyname FROM pg_policies WHERE schemaname='public' ORDER BY 1,2`);
  console.log('Remaining public-schema policies:\n' + pol.rows.map((r) => `  ${r.tablename}: ${r.policyname}`).join('\n'));
  await client.end();
})().catch((e) => {
  console.error('\nMigration failed:', e.message);
  process.exit(1);
});
