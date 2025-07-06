Login Worker - Secure User Authentication System

This is a production-ready Cloudflare Worker designed for secure user authentication with JWT token generation, rate limiting, and backend integration.

KEY FEATURES:
- Secure user authentication with username/password validation
- JWT token generation for authenticated sessions
- Rate limiting to prevent brute force attacks
- Backend API integration for user verification
- Comprehensive input validation and sanitization
- CORS protection with configurable origins
- Detailed error handling without information leakage
- Production-ready deployment configuration

SETUP REQUIREMENTS:
1. Cloudflare Workers account
2. Backend API endpoint for user authentication
3. JWT secret for token generation
4. Wrangler CLI for deployment

QUICK START:
1. Copy wrangler.toml.example to wrangler.toml
2. Configure your backend URL: wrangler secret put BACKEND_URL
3. Set JWT secret: wrangler secret put JWT_SECRET
4. Deploy: wrangler deploy
5. Test using the included test.html file

SECURITY FEATURES:
- All authentication requests validated and sanitized
- Rate limiting per IP address prevents brute force attacks
- JWT tokens securely generated with proper expiration
- Error messages sanitized to prevent information disclosure
- Backend communication secured with proper authentication
- Request method validation (POST only)

This worker is part of a larger user management system and integrates with:
- SignUpWorker (for user registration)
- ForgotPassWorker (for password resets)
- ProfileInfoWorker (for accessing user data)
- DeleteProfileWorker (for account management)

For detailed documentation, see README.md
For deployment guidance, see DEPLOYMENT_CHECKLIST.md
For security information, see SECURITY.md
