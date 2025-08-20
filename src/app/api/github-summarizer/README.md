# GitHub README Fetcher API

Endpoint API untuk mengambil konten README.md dari repository GitHub dengan validasi API key.

## Endpoint

```
POST /api/github-summarizer
GET /api/github-summarizer
```

## Deskripsi

Endpoint ini menggunakan validasi API key yang sama dengan `apiKeyValidationService` untuk memastikan keamanan akses. Setiap request yang valid akan meningkatkan counter usage pada API key.

Fungsi utama endpoint ini adalah:

- Memvalidasi API key dari header `x-api-key`
- Mengekstrak informasi owner dan repository dari GitHub URL
- Mengambil konten README.md dari repository GitHub
- Mendukung berbagai format nama file README (README.md, readme.md, Readme.md, README.MD)
- Mengembalikan konten README dalam format text

## Request

### POST /api/github-summarizer

**Headers:**

```
Content-Type: application/json
x-api-key: your-api-key-here
```

**Body:**

```json
{
  "githubUrl": "string (required)"
}
```

**Contoh:**

```json
{
  "githubUrl": "https://github.com/username/repository"
}
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "GitHub README content retrieved successfully",
  "apiKey": {
    "id": 1,
    "name": "Test API Key",
    "usage": 5
  },
  "githubUrl": "https://github.com/username/repository",
  "readmeContent": "# Repository Name\n\nThis is the README content...",
  "contentLength": 1234
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "error": "API key is required in x-api-key header"
}
```

```json
{
  "error": "GitHub URL is required in request body"
}
```

```json
{
  "error": "Invalid GitHub URL format. Expected: https://github.com/owner/repo"
}
```

```json
{
  "error": "README.md file not found in the repository"
}
```

#### 401 Unauthorized

```json
{
  "error": "Invalid API Key"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## GET /api/github-summarizer

Mengembalikan informasi tentang endpoint API.

**Response:**

```json
{
  "message": "GitHub Summarizer API",
  "description": "POST to this endpoint with x-api-key header and githubUrl in body to fetch README.md content from GitHub repositories",
  "usage": {
    "method": "POST",
    "headers": {
      "x-api-key": "string (required)"
    },
    "body": {
      "githubUrl": "string (required)"
    }
  }
}
```

## Implementasi

Endpoint ini menggunakan:

- **Validasi API Key**: Sama dengan `apiKeyValidationService`
- **Database**: Supabase untuk menyimpan dan memvalidasi API keys
- **Usage Tracking**: Otomatis menambah counter usage setiap request yang valid
- **Error Handling**: Comprehensive error handling dengan status codes yang sesuai
- **GitHub API Integration**: Menggunakan GitHub REST API untuk mengambil konten README.md
- **URL Parsing**: Mengekstrak owner dan repository dari GitHub URL
- **Multiple README Support**: Mendukung berbagai format nama file README

## Fitur

- ✅ Validasi API key dari header `x-api-key`
- ✅ Parsing GitHub URL untuk ekstrak owner/repo
- ✅ Fetch README.md content dari GitHub API
- ✅ Support multiple README file formats
- ✅ Base64 decoding untuk konten file
- ✅ Error handling untuk berbagai skenario
- ✅ Usage tracking untuk API key

## TODO

- Implementasi caching untuk hasil README content
- Rate limiting berdasarkan API key
- Support untuk private repositories (dengan GitHub token)
- Implementasi summarization dari README content
- Support untuk file README dalam format lain (txt, rst, dll)
