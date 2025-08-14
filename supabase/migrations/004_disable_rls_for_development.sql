-- Disable RLS untuk development (lebih mudah untuk testing)
-- Untuk production, sebaiknya gunakan RLS dengan authentication

-- Drop all existing policies
DROP POLICY IF EXISTS "Public read access" ON api_keys;
DROP POLICY IF EXISTS "Public insert access" ON api_keys;
DROP POLICY IF EXISTS "Public update access" ON api_keys;
DROP POLICY IF EXISTS "Public delete access" ON api_keys;
DROP POLICY IF EXISTS "Enable read access for all users" ON api_keys;
DROP POLICY IF EXISTS "Enable insert access for all users" ON api_keys;
DROP POLICY IF EXISTS "Enable update access for all users" ON api_keys;
DROP POLICY IF EXISTS "Enable delete access for all users" ON api_keys;

-- Disable RLS
ALTER TABLE api_keys DISABLE ROW LEVEL SECURITY;

-- Note: Untuk production, sebaiknya gunakan:
-- ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
-- Dan buat policies yang sesuai dengan authentication 