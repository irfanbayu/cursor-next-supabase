# Bayayaw AI - API Keys Management Dashboard

Dashboard untuk mengelola API keys dengan integrasi Supabase database.

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Jalankan setup script
npm run setup-supabase

# Atau buat file .env.local manual
cp .env.local.example .env.local
```

### 2. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Salin URL dan Anon Key dari Settings > API
3. Update `.env.local` dengan nilai yang sesuai
4. Jalankan migration SQL dari `supabase/migrations/001_create_api_keys_table.sql`

### 3. Fix RLS Issues (PENTING!)

Jika mendapatkan error "row-level security policy", jalankan salah satu dari:

```sql
-- Option 1: Disable RLS untuk development (Recommended)
-- Jalankan: supabase/migrations/004_disable_rls_for_development.sql

-- Option 2: Enable RLS dengan public access
-- Jalankan: supabase/migrations/003_fix_rls_policies.sql
```

### 4. Install & Run

```bash
npm install
npm run dev
```

Buka [http://localhost:3000/dashboard](http://localhost:3000/dashboard) untuk melihat dashboard.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (optional)

## 📁 Project Structure

```
test/
├── lib/
│   └── supabaseClient.ts          # Supabase client configuration
├── src/
│   ├── services/
│   │   ├── apiKeyService.ts       # Legacy API service
│   │   └── supabaseApiKeyService.ts  # Supabase API service
│   ├── store/
│   │   └── apiKeySlice.ts         # Redux slice
│   ├── hooks/
│   │   └── redux.ts               # Redux hooks
│   ├── providers/
│   │   └── Providers.tsx          # Redux provider
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

## ✨ Features

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
- **Real-time Updates**: Data terupdate secara real-time
- **Loading States**: Loading indicator saat operasi berlangsung
- **Error Handling**: Error handling yang proper

### ✅ UI Features

- **Responsive Design**: UI yang responsive dan modern
- **Beautiful Interface**: Menggunakan Tailwind CSS untuk styling
- **User-friendly**: Interface yang mudah digunakan

## 🔧 Configuration

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: API URL (if you have a separate API server)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Database Schema

Tabel `api_keys` dengan struktur:

- `id`: BIGSERIAL (Primary Key)
- `created_at`: TIMESTAMP WITH TIME ZONE - Waktu pembuatan
- `name`: TEXT - Nama API key
- `value`: TEXT - API key value (unique)
- `usage`: BIGINT - Usage count (default 0)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🔐 Troubleshooting

### Error: "new row violates row-level security policy"

Jalankan salah satu dari migration berikut di Supabase SQL Editor:

```sql
-- Option 1: Disable RLS (untuk development)
ALTER TABLE api_keys DISABLE ROW LEVEL SECURITY;

-- Option 2: Create proper policies
CREATE POLICY "Enable insert access for all users" ON api_keys FOR INSERT WITH CHECK (true);
```

### Error: "relation does not exist"

Pastikan tabel sudah dibuat dengan menjalankan migration `001_create_api_keys_table.sql`

## 📚 Documentation

- [Supabase Setup Guide](SUPABASE_SETUP.md) - Panduan lengkap setup Supabase
- [Supabase Documentation](https://supabase.com/docs) - Dokumentasi resmi Supabase
- [Next.js Documentation](https://nextjs.org/docs) - Dokumentasi Next.js

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Jika ada pertanyaan atau masalah:

1. Cek [SUPABASE_SETUP.md](SUPABASE_SETUP.md) untuk troubleshooting
2. Buat issue di GitHub repository
3. Hubungi tim development

---

**Happy Coding! 🎉**
