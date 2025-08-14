-- Fix RLS policies untuk mengizinkan operasi CRUD
-- Drop existing policies first
DROP POLICY IF EXISTS "Public read access" ON api_keys;
DROP POLICY IF EXISTS "Public insert access" ON api_keys;
DROP POLICY IF EXISTS "Public update access" ON api_keys;
DROP POLICY IF EXISTS "Public delete access" ON api_keys;

-- Create new policies yang lebih permisif untuk development
-- Untuk production, sebaiknya gunakan authentication

-- Policy untuk SELECT (read)
CREATE POLICY "Enable read access for all users" ON api_keys
  FOR SELECT USING (true);

-- Policy untuk INSERT (create)
CREATE POLICY "Enable insert access for all users" ON api_keys
  FOR INSERT WITH CHECK (true);

-- Policy untuk UPDATE (update)
CREATE POLICY "Enable update access for all users" ON api_keys
  FOR UPDATE USING (true);

-- Policy untuk DELETE (delete)
CREATE POLICY "Enable delete access for all users" ON api_keys
  FOR DELETE USING (true);

-- Alternative: Jika ingin disable RLS untuk development
-- ALTER TABLE api_keys DISABLE ROW LEVEL SECURITY; 