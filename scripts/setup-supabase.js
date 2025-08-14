#!/usr/bin/env node

/**
 * Setup script untuk Supabase
 *
 * Cara penggunaan:
 * 1. npm run setup-supabase
 * 2. Ikuti instruksi yang muncul
 */

import fs from "fs";
import path from "path";

console.log("🚀 Supabase Setup untuk API Keys Management");
console.log("============================================\n");

// Check if .env.local exists
const envPath = path.join(__dirname, "..", ".env.local");
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log("📝 Membuat file .env.local...");

  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: API URL (if you have a separate API server)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
`;

  fs.writeFileSync(envPath, envContent);
  console.log("✅ File .env.local berhasil dibuat!");
  console.log("⚠️  Jangan lupa untuk mengisi nilai yang sesuai untuk:");
  console.log("   - NEXT_PUBLIC_SUPABASE_URL");
  console.log("   - NEXT_PUBLIC_SUPABASE_ANON_KEY\n");
} else {
  console.log("✅ File .env.local sudah ada\n");
}

console.log("📋 Langkah-langkah setup yang perlu dilakukan:\n");

console.log("1. 🔧 Setup Supabase Project:");
console.log("   - Buat project baru di https://supabase.com");
console.log("   - Salin URL dan Anon Key dari Settings > API");
console.log("   - Update file .env.local dengan nilai yang sesuai\n");

console.log("2. 🗄️  Setup Database:");
console.log("   - Buka SQL Editor di Supabase Dashboard");
console.log(
  "   - Jalankan script dari file: supabase/migrations/001_create_api_keys_table.sql"
);
console.log("   - (Optional) Jalankan seed data dari: supabase/seed.sql\n");

console.log("3. 🔐 Fix RLS Issues (PENTING!):");
console.log(
  '   - Jika mendapatkan error "row-level security policy", jalankan:'
);
console.log("   - supabase/migrations/004_disable_rls_for_development.sql");
console.log("   - Atau untuk RLS dengan public access:");
console.log("   - supabase/migrations/003_fix_rls_policies.sql\n");

console.log("4. 🚀 Run Application:");
console.log("   - npm install");
console.log("   - npm run dev");
console.log("   - Buka http://localhost:3000/dashboard\n");

console.log("📚 Dokumentasi lengkap tersedia di: SUPABASE_SETUP.md\n");

console.log("🎉 Setup selesai! Selamat coding! 🎉");
