-- Seed data for api_keys table (for testing purposes)
-- Sesuai dengan struktur tabel di Supabase dashboard

INSERT INTO api_keys (name, value, usage) VALUES
(
  'Production API Key',
  'tvly-prod-1234567890abcdef1234567890',
  24
),
(
  'Development API Key',
  'tvly-dev-abcdef1234567890abcdef1234',
  5
),
(
  'Testing API Key',
  'tvly-test-567890abcdef1234567890abcd',
  0
)
ON CONFLICT (value) DO NOTHING; 