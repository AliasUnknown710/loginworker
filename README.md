# Login Worker

A secure Cloudflare Worker for handling user authentication with comprehensive security features and backend integration.

## Features

- 🔒 **Secure Authentication**: Password hashing and validation
- 🛡️ **Input Validation**: Comprehensive request validation
- 🌐 **Backend Integration**: Secure communication with authentication API
- 📊 **Error Handling**: Detailed error responses and logging
- 🚀 **CORS Support**: Proper cross-origin request handling
- 🛡️ **Rate Limiting**: Protection against brute force attacks
- 🔐 **JWT Token Support**: Secure token generation and validation
- ⚡ **High Performance**: Optimized for Cloudflare Edge

## Quick Setup

### 1. Set Your Backend URL

```bash
wrangler secret put BACKEND_URL
```

### 2. Set JWT Secret

```bash
wrangler secret put JWT_SECRET
```

### 3. Deploy

```bash
wrangler deploy
```

## API Endpoint

### POST /

Authenticates a user and returns an authentication token.

**Headers:**
- `Content-Type: application/json` (required)

**Request Body:**
```json
{
    "username": "user@example.com",
    "password": "userpassword"
}
```

**Response:**
- `200 OK`: Authentication successful
  ```json
  {
    "success": true,
    "token": "jwt-token",
    "user": {
      "id": "user123",
      "username": "user@example.com",
      "name": "User Name"
    }
  }
  ```
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Invalid credentials
- `405 Method Not Allowed`: Non-POST request
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Backend error

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BACKEND_URL` | Backend API endpoint for authentication | Yes |
| `JWT_SECRET` | Secret key for JWT token generation | Yes |

## Security Features

- Password strength validation
- Input sanitization and validation
- Rate limiting per IP address
- Secure backend communication
- JWT token generation
- Error message sanitization
- Request method validation
- CORS protection

## Development

1. Copy `wrangler.toml.example` to `wrangler.toml`
2. Configure your environment variables
3. Test using `test.html`
4. Deploy with `wrangler deploy`

## Testing

Use the provided `test.html` file to test the worker functionality locally or after deployment.

## Rate Limiting

The worker includes built-in rate limiting to prevent brute force attacks:
- Maximum 10 login attempts per IP per hour
- Configurable limits via environment variables
- Automatic cleanup of expired rate limit data
