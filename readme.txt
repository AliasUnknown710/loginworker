LoginWorker - Cloudflare Worker Authentication Template
=========================================================

Quick Start:
1. Copy wrangler.toml.example to wrangler.toml
2. Set BACKEND_AUTH_URL environment variable
3. Run: npm install && npm run dev
4. Open test.html to test locally

What this template provides:
- Secure login authentication middleware
- Input validation and sanitization
- CORS support for web apps
- Backend service integration
- Comprehensive error handling
- Security best practices

Files Overview:
- index.js: Main worker entry point with request handling
- loginworker.js: Business logic for authentication
- test.html: Interactive testing interface
- package.json: Dependencies and scripts
- wrangler.toml.example: Configuration template
- README.md: Comprehensive documentation

Security Features:
✓ Strong input validation
✓ Password complexity requirements
✓ Username format enforcement
✓ Control character sanitization
✓ Method and content-type restrictions
✓ Generic error messages

For complete documentation, see README.md

Support: Use GitHub Issues for questions and bug reports