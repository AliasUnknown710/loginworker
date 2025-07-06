# Setup Guide

This guide provides detailed setup instructions for the LoginWorker Cloudflare Worker template.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Cloudflare account** (free tier works)
- **Wrangler CLI** (will be installed with dependencies)
- **Backend authentication service** (API endpoint that accepts login credentials)

## Step-by-Step Setup

### 1. Project Setup

#### Clone the Repository
```bash
git clone <your-repository-url>
cd LoginWorker
```

#### Install Dependencies
```bash
npm install
```

This will install:
- Wrangler CLI for Cloudflare Workers
- TypeScript definitions
- Development tools (ESLint, Prettier)

### 2. Cloudflare Configuration

#### Login to Cloudflare
```bash
npx wrangler login
```

This will open your browser for authentication.

#### Verify Authentication
```bash
npx wrangler whoami
```

### 3. Environment Configuration

#### Create Configuration File
```bash
# Windows
copy wrangler.jsonc.example wrangler.jsonc

# macOS/Linux
cp wrangler.jsonc.example wrangler.jsonc
```

#### Edit wrangler.jsonc
```json
{
  "name": "your-loginworker",
  "main": "index.js",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"],

  // Add your custom domain if needed
  // "routes": [
  //   {
  //     "pattern": "auth.yourdomain.com/*",
  //     "zone_name": "yourdomain.com"
  //   }
  // ]
}
```

### 4. Environment Variables

#### Set Backend URL (Required)
```bash
npx wrangler secret put BACKEND_AUTH_URL
```

When prompted, enter your backend authentication endpoint:
```
https://api.yourapp.com/auth/login
```

#### Verify Secrets
```bash
npx wrangler secret list
```

### 5. Backend Service Requirements

Your backend authentication endpoint must:

#### Accept POST Requests
```javascript
// Expected request format
{
  "username": "string",
  "password": "string"
}
```

#### Return JSON Response
```javascript
// Success response (HTTP 200)
{
  "success": true,
  "token": "optional-jwt-token",
  "message": "Authentication successful"
}

// Failure response (HTTP 401)
{
  "success": false,
  "message": "Invalid credentials"
}

// Server error (HTTP 500)
{
  "success": false,
  "message": "Internal server error"
}
```

#### Example Backend Implementation (Node.js/Express)
```javascript
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Your authentication logic here
    const user = await authenticateUser(username, password);
    
    if (user) {
      const token = generateJWT(user);
      res.json({
        success: true,
        token: token,
        message: "Authentication successful"
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});
```

### 6. Development and Testing

#### Start Local Development Server
```bash
npm run dev
```

The worker will be available at `http://localhost:8787`

#### Test with HTML Interface
1. Keep the development server running
2. Open `test.html` in your browser
3. Test with various credentials
4. Check the responses and validation

#### Test with cURL
```bash
# Valid request
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user","password":"Password123!"}'

# Invalid method (should return 405)
curl -X GET http://localhost:8787

# Invalid content type (should return 415)
curl -X POST http://localhost:8787 \
  -H "Content-Type: text/plain" \
  -d "invalid"
```

### 7. Deployment

#### Deploy to Cloudflare
```bash
npm run deploy
```

#### Verify Deployment
```bash
npx wrangler tail
```

Keep this running to see live logs from your worker.

#### Test Production Deployment
```bash
curl -X POST https://your-loginworker.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user","password":"Password123!"}'
```

### 8. Custom Domain Setup (Optional)

#### Add Domain to Cloudflare
1. Add your domain to Cloudflare
2. Update nameservers
3. Wait for DNS propagation

#### Configure Worker Route
```json
// In wrangler.jsonc
"routes": [
  {
    "pattern": "auth.yourdomain.com/*",
    "zone_name": "yourdomain.com"
  }
]
```

#### Deploy with Custom Domain
```bash
npm run deploy
```

## Environment-Specific Setups

### Staging Environment

#### Create Staging Configuration
```json
// In wrangler.jsonc
"env": {
  "staging": {
    "name": "loginworker-staging"
    // Add staging-specific variables
  }
}
```

#### Deploy to Staging
```bash
npx wrangler deploy --env staging
```

#### Set Staging Secrets
```bash
npx wrangler secret put BACKEND_AUTH_URL --env staging
```

### Production Environment

#### Create Production Configuration
```json
// In wrangler.jsonc
"env": {
  "production": {
    "name": "loginworker-production"
  }
}
```

#### Deploy to Production
```bash
npx wrangler deploy --env production
```

## Advanced Configuration

### Rate Limiting

Configure in Cloudflare Dashboard:
1. Go to Security → WAF
2. Create rate limiting rule
3. Set limits (e.g., 10 requests per minute per IP)

### Analytics

#### Enable Analytics Engine
```json
// In wrangler.jsonc
"analytics_engine_datasets": [
  {
    "binding": "LOGIN_ANALYTICS",
    "dataset": "login_metrics"
  }
]
```

#### Update Code to Log Events
```javascript
// In loginworker.js
env.LOGIN_ANALYTICS.writeDataPoint({
  'timestamp': Date.now(),
  'success': result.success,
  'ip': request.headers.get('CF-Connecting-IP')
});
```

### KV Storage (Optional)

#### Create KV Namespace
```bash
npx wrangler kv:namespace create "LOGIN_CACHE"
```

#### Add to Configuration
```json
// In wrangler.jsonc
"kv_namespaces": [
  {
    "binding": "LOGIN_CACHE",
    "id": "your-kv-namespace-id"
  }
]
```

## Troubleshooting

### Common Issues

#### "Module not found" Error
```bash
# Ensure you're using ES modules
npm run deploy
```

#### CORS Issues
Check the `corsHeaders` configuration in `index.js`:
```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://yourfrontend.com', // Be specific in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
```

#### Backend Connection Issues
1. Verify `BACKEND_AUTH_URL` is set correctly
2. Ensure backend accepts the request format
3. Check backend CORS configuration
4. Verify SSL certificates on backend

#### Authentication Failures
1. Check username/password validation rules
2. Verify backend response format
3. Check network connectivity to backend
4. Review worker logs with `wrangler tail`

### Debugging

#### Enable Detailed Logging
```javascript
// Add to loginworker.js
console.log('Request received:', { username, timestamp: Date.now() });
console.log('Backend response:', result);
```

#### Monitor with Wrangler
```bash
npx wrangler tail --format pretty
```

#### Check Cloudflare Logs
1. Go to Cloudflare Dashboard
2. Select your domain
3. Go to Analytics → Logs

## Performance Optimization

### Reduce Cold Start Time
- Keep dependencies minimal
- Use tree-shaking where possible
- Avoid large libraries

### Optimize Backend Calls
- Use connection pooling on backend
- Implement proper timeout handling
- Consider caching for repeated validations

### Monitor Performance
- Use Cloudflare Analytics
- Set up alerts for high latency
- Monitor error rates

## Next Steps

After setup:
1. Review the [Security Guide](SECURITY.md)
2. Check [Contributing Guidelines](CONTRIBUTING.md)
3. Configure monitoring and alerts
4. Set up automated testing
5. Plan for scaling and maintenance
