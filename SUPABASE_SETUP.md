# Supabase Setup untuk API Keys Management

## 1. Setup Environment Variables

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Database Schema

Pastikan tabel `api_keys` sudah ada di Supabase dengan struktur berikut (sesuai dengan screenshot):

```sql
CREATE TABLE api_keys (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  usage BIGINT DEFAULT 0
);
```

## 3. Row Level Security (RLS) Setup

### Option A: Disable RLS untuk Development (Recommended)

Jalankan migration ini untuk menonaktifkan RLS dan mengizinkan semua operasi:

```sql
-- Disable RLS untuk development
ALTER TABLE api_keys DISABLE ROW LEVEL SECURITY;
```

### Option B: Enable RLS dengan Public Access

Jika ingin tetap menggunakan RLS, jalankan migration ini:

```sql
-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policies untuk public access
CREATE POLICY "Enable read access for all users" ON api_keys FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON api_keys FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON api_keys FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON api_keys FOR DELETE USING (true);
```

### Option C: Enable RLS dengan Authentication (Production)

Untuk production, gunakan authentication dan buat policies yang sesuai:

```sql
-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policies untuk authenticated users
CREATE POLICY "Users can manage their own API keys" ON api_keys
  FOR ALL USING (auth.uid() = user_id);
```

## 4. Features yang Sudah Diimplementasi

### ✅ CRUD Operations

- **Create**: Membuat API key baru dengan nama dan value (otomatis generate jika kosong)
- **Read**: Mengambil semua API keys dari database
- **Update**: Mengupdate nama dan value API key
- **Delete**: Menghapus API key dari database

### ✅ Additional Features

- **Usage Tracking**: Increment usage count dengan tombol +1
- **Key Generation**: Generate API key otomatis dengan format `tvly-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Key Visibility**: Toggle untuk menampilkan/menyembunyikan API key
- **Copy to Clipboard**: Copy API key ke clipboard

### ✅ UI Features

- **Real-time Updates**: Data akan terupdate secara real-time
- **Loading States**: Loading indicator saat operasi berlangsung
- **Error Handling**: Error handling yang proper
- **Responsive Design**: UI yang responsive

## 5. File Structure

```
test/
├── lib/
│   └── supabaseClient.ts          # Supabase client configuration
├── src/
│   ├── services/
│   │   └── supabaseApiKeyService.ts  # Supabase API key service
│   ├── store/
│   │   └── apiKeySlice.ts         # Redux slice dengan Supabase integration
│   └── app/
│       └── dashboard/
│           └── page.tsx           # Dashboard component
├── supabase/
│   ├── migrations/
│   │   ├── 001_create_api_keys_table.sql
│   │   ├── 003_fix_rls_policies.sql
│   │   └── 004_disable_rls_for_development.sql
│   └── seed.sql                   # Sample data
├── scripts/
│   └── setup-supabase.js          # Setup script
└── SUPABASE_SETUP.md              # Detailed setup guide
```

## 6. Cara Penggunaan

1. **Setup Environment**: Pastikan environment variables sudah dikonfigurasi
2. **Install Dependencies**: `npm install` (sudah termasuk `@supabase/supabase-js`)
3. **Setup Database**: Jalankan migration SQL di Supabase Dashboard
4. **Fix RLS Issues**: Jalankan migration untuk mengatasi masalah RLS
5. **Run Development Server**: `npm run dev`
6. **Access Dashboard**: Buka `http://localhost:3000/dashboard`

## 7. Troubleshooting

### Error: "new row violates row-level security policy"

Jika mendapatkan error ini, jalankan salah satu dari:

```sql
-- Option 1: Disable RLS (untuk development)
ALTER TABLE api_keys DISABLE ROW LEVEL SECURITY;

-- Option 2: Create proper policies
CREATE POLICY "Enable insert access for all users" ON api_keys FOR INSERT WITH CHECK (true);
```

### Error: "relation does not exist"

Pastikan tabel sudah dibuat dengan menjalankan migration `001_create_api_keys_table.sql`

## 8. API Endpoints yang Digunakan

Semua operasi menggunakan Supabase client langsung:

- `supabase.from('api_keys').select('*')` - Fetch all API keys
- `supabase.from('api_keys').insert([data])` - Create new API key
- `supabase.from('api_keys').update(data).eq('id', id)` - Update API key
- `supabase.from('api_keys').delete().eq('id', id)` - Delete API key
- `supabase.from('api_keys').update({usage: newValue}).eq('id', id)` - Increment usage

## 9. Security Considerations

- API keys disimpan dengan format `tvly-` prefix
- Row Level Security (RLS) dapat diaktifkan untuk keamanan
- Environment variables untuk konfigurasi sensitif
- Error handling yang proper untuk mencegah data leakage
- Untuk production, gunakan authentication dan proper RLS policies
