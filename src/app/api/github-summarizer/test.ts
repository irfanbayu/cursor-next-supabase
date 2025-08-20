// Test file untuk GitHub README Fetcher API
// Jalankan dengan: npm run dev dan test dengan curl atau Postman

/*
Contoh penggunaan dengan curl:

1. Test GET endpoint:
curl http://localhost:3000/api/github-summarizer

2. Test POST endpoint dengan API key yang valid:
curl -X POST http://localhost:3000/api/github-summarizer \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-valid-api-key-here" \
  -d '{
    "githubUrl": "https://github.com/username/repository"
  }'

3. Test POST endpoint tanpa API key:
curl -X POST http://localhost:3000/api/github-summarizer \
  -H "Content-Type: application/json" \
  -d '{
    "githubUrl": "https://github.com/username/repository"
  }'

4. Test POST endpoint dengan API key yang tidak valid:
curl -X POST http://localhost:3000/api/github-summarizer \
  -H "Content-Type: application/json" \
  -H "x-api-key: invalid-api-key" \
  -d '{
    "githubUrl": "https://github.com/username/repository"
  }'
*/

// Contoh response yang diharapkan:

/*
GET Response:
{
  "message": "GitHub Summarizer API",
  "description": "POST to this endpoint with apiKey and githubUrl to summarize GitHub repositories",
  "usage": {
    "method": "POST",
    "body": {
      "apiKey": "string (required)",
      "githubUrl": "string (required)"
    }
  }
}

POST Success Response:
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

POST Error Response (400):
{
  "error": "API key is required in x-api-key header"
}

POST Error Response (401):
{
  "error": "Invalid API Key"
}
*/
