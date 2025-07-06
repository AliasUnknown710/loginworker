# LoginWorker

A secure Cloudflare Worker template for handling user authentication. This worker acts as a middleware that validates user credentials and forwards them to your backend authentication service.

## Features

- ✅ Input validation and sanitization
- ✅ Strong password requirements
- ✅ CORS support for web applications
- ✅ Secure credential forwarding to backend
- ✅ Error handling and security best practices
- ✅ Rate limiting ready (configure in Cloudflare dashboard)

## Security Features

- **Input Sanitization**: Removes control characters and trims whitespace
- **Username Validation**: 3-32 characters, alphanumeric and underscores only
- **Password Validation**: 8-64 characters, requires letters and numbers
- **Method Restriction**: Only accepts POST requests
- **Content-Type Enforcement**: Requires application/json
- **Error Masking**: Generic error messages to prevent information leakage

## Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd LoginWorker
npm install
```

### 2. Configure Environment

Copy `wrangler.toml.example` to `wrangler.toml` and update with your settings:

```bash
cp wrangler.toml.example wrangler.toml
```

### 3. Set Environment Variables

In your Cloudflare dashboard or via Wrangler CLI, set:

```bash
wrangler secret put BACKEND_AUTH_URL
```

Enter your backend authentication endpoint URL (e.g., `https://api.yourapp.com/auth/login`)

### 4. Development

```bash
npm run dev
```

### 5. Deploy

```bash
npm run deploy
```

## API Usage

### Endpoint

```
POST https://your-worker.your-subdomain.workers.dev/
```

### Request Format

```json
{
  "username": "john_doe123",
  "password": "SecurePass123!"
}
```

### Response Format

**Success (200):**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "message": "Login successful"
}
```

**Failure (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Invalid username or password format"
}
```

## Testing

Use the included `test.html` file to test your worker locally:

```bash
npm run dev
# Open test.html in your browser
```

## Backend Integration

Your backend authentication endpoint should:

1. Accept POST requests with JSON body containing `username` and `password`
2. Return JSON response with `success`, `token` (optional), and `message` fields
3. Use appropriate HTTP status codes (200 for success, 401 for invalid credentials)

Example backend response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Authentication successful"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BACKEND_AUTH_URL` | Your backend authentication endpoint | Yes |

## Customization

### Username Rules
Edit the `isValidUsername()` function in `loginworker.js` to modify username requirements.

### Password Rules
Edit the `isValidPassword()` function in `loginworker.js` to modify password requirements.

### CORS Settings
Modify the `corsHeaders` object in `index.js` to adjust CORS policy.

## Security Considerations

1. **Always use HTTPS** for your backend authentication endpoint
2. **Implement rate limiting** in Cloudflare dashboard
3. **Monitor logs** for suspicious activity
4. **Keep dependencies updated** regularly
5. **Validate JWT tokens** on your backend if using token-based auth
6. **Use environment variables** for sensitive configuration

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please use the GitHub Issues tab.