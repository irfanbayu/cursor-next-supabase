-- Create api_keys table - sesuai dengan struktur di Supabase dashboard
CREATE TABLE IF NOT EXISTS api_keys (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  usage BIGINT DEFAULT 0
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_api_keys_created_at ON api_keys(created_at DESC);

-- Note: RLS tidak diaktifkan secara default untuk development
-- Untuk mengaktifkan RLS, jalankan migration 003_fix_rls_policies.sql
-- Untuk menonaktifkan RLS, jalankan migration 004_disable_rls_for_development.sql 