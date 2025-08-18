# API Key Validation Testing Guide

## Overview

Sistem validasi API key sekarang menggunakan database Supabase untuk memvalidasi API key yang dimasukkan user.

## Valid API Keys untuk Testing

Berdasarkan data seed di `supabase/seed.sql`, berikut adalah API key yang valid untuk testing:

### 1. Production API Key

- **Key**: `tvly-prod-1234567890abcdef1234567890`
- **Name**: Production API Key
- **Usage**: 24

### 2. Development API Key

- **Key**: `tvly-dev-abcdef1234567890abcdef1234`
- **Name**: Development API Key
- **Usage**: 5

### 3. Testing API Key

- **Key**: `tvly-test-567890abcdef1234567890abcd`
- **Name**: Testing API Key
- **Usage**: 0

## Cara Testing

### 1. Validasi API Key Valid

1. Buka aplikasi dan klik "API Playground" di sidebar
2. Masukkan salah satu API key valid di atas
3. Klik "Validate API Key"
4. Akan redirect ke `/protected` dan menampilkan:
   - Toast notification hijau: "Valid API key, /protected can be accessed"
   - Detail API key (Name, ID, Usage Count)
   - Usage count akan bertambah +1

### 2. Validasi API Key Invalid

1. Masukkan API key yang tidak ada di database (misal: `invalid-key-123`)
2. Akan menampilkan:
   - Toast notification merah: "Invalid API Key"
   - Pesan "Access Denied"

### 3. Tanpa API Key

1. Akses langsung ke `/protected` tanpa query parameter
2. Akan menampilkan:
   - Toast notification merah: "No API key provided"

## Fitur Tambahan

### Auto Update Usage Count

- Setiap kali API key divalidasi dengan sukses, usage count akan bertambah +1
- Data tersimpan di database Supabase

### Error Handling

- Menangani error koneksi database
- Menangani API key yang tidak ditemukan
- Menampilkan pesan error yang informatif

## Database Schema

```sql
CREATE TABLE api_keys (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  usage BIGINT DEFAULT 0
);
```

## Environment Variables

Pastikan environment variables berikut sudah diset:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
