# Contributing to LoginWorker

Thank you for your interest in contributing to LoginWorker! This guide will help you get started with contributing to this secure Cloudflare Worker authentication template.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Contribution Types](#contribution-types)
- [Code Standards](#code-standards)
- [Security Guidelines](#security-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- Git
- Cloudflare account (for testing)
- Basic knowledge of JavaScript/TypeScript
- Understanding of web security principles

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/LoginWorker.git
cd LoginWorker
```

3. Add the upstream repository:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/LoginWorker.git
```

4. Install dependencies:
```bash
npm install
```

### Development Setup

1. Copy the example configuration:
```bash
cp wrangler.toml.example wrangler.toml
```

2. Set up your test backend or use a mock service
3. Configure environment variables for testing
4. Run the development server:
```bash
npm run dev
```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual features
- `bugfix/bug-description` - Bug fixes
- `security/security-issue` - Security-related fixes

### Workflow Steps

1. **Create a branch** from `develop`:
```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

2. **Make your changes** following our coding standards

3. **Test thoroughly** including security testing

4. **Commit your changes** with descriptive messages:
```bash
git add .
git commit -m "feat: add input validation for email addresses

- Add email format validation
- Include tests for edge cases
- Update documentation"
```

5. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request** to the `develop` branch

## Contribution Types

### 🐛 Bug Fixes

- Security vulnerabilities (see [Security Policy](#security-guidelines))
- Input validation issues
- Error handling improvements
- Performance issues

### ✨ Features

- New authentication methods
- Enhanced validation rules
- Monitoring and analytics
- Developer experience improvements

### 📚 Documentation

- Setup guides
- Security documentation
- API documentation
- Code examples

### 🧪 Testing

- Unit tests
- Integration tests
- Security tests
- Performance tests

### 🔧 Infrastructure

- CI/CD improvements
- Development tooling
- Build optimizations

## Code Standards

### JavaScript/TypeScript Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

### Code Style Guidelines

#### Variable Naming
```javascript
// Use camelCase for variables and functions
const userCredentials = { username, password };
const isValidUser = validateUser(credentials);

// Use PascalCase for classes and constructors
class AuthenticationHandler {
  constructor(config) {
    this.config = config;
  }
}

// Use UPPER_SNAKE_CASE for constants
const MAX_LOGIN_ATTEMPTS = 5;
const DEFAULT_TIMEOUT = 30000;
```

#### Function Structure
```javascript
// Keep functions small and focused
function validateUsername(username) {
  if (typeof username !== 'string') {
    return false;
  }
  
  return /^[a-zA-Z0-9_]{3,32}$/.test(username);
}

// Use descriptive parameter names
function authenticateUser({ username, password }, env) {
  // Implementation
}

// Handle errors gracefully
async function callBackendService(credentials, backendUrl) {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    return await response.json();
  } catch (error) {
    // Log error without exposing sensitive data
    console.error('Backend service error:', error.message);
    throw new Error('Authentication service unavailable');
  }
}
```

#### Comments and Documentation
```javascript
/**
 * Validates user credentials according to security requirements
 * @param {Object} credentials - User credentials
 * @param {string} credentials.username - Username (3-32 chars, alphanumeric + underscore)
 * @param {string} credentials.password - Password (8-64 chars, letters + numbers required)
 * @returns {Object} Validation result with success status and message
 */
function validateCredentials({ username, password }) {
  // Validate username format
  if (!isValidUsername(username)) {
    return { 
      success: false, 
      message: 'Invalid username format' 
    };
  }
  
  // Validate password complexity
  if (!isValidPassword(password)) {
    return { 
      success: false, 
      message: 'Invalid password format' 
    };
  }
  
  return { success: true };
}
```

## Security Guidelines

### Security-First Development

All contributions must follow security best practices:

#### Input Validation
```javascript
// Always validate and sanitize input
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  // Remove control characters and trim
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

// Validate against known patterns
function isValidInput(input, pattern) {
  return typeof input === 'string' && pattern.test(input);
}
```

#### Error Handling
```javascript
// Never expose internal details in error messages
function handleAuthenticationError(error) {
  // Log detailed error internally
  console.error('Authentication error details:', {
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  // Return generic message to client
  return {
    success: false,
    message: 'Authentication failed'
  };
}
```

#### Secrets Management
```javascript
// Never hardcode secrets
const badExample = {
  apiKey: 'sk-1234567890abcdef', // ❌ Never do this
  secret: 'my-secret-key'        // ❌ Never do this
};

// Use environment variables
const goodExample = {
  apiKey: env.API_KEY,           // ✅ Environment variable
  secret: env.SECRET_KEY         // ✅ Environment variable
};
```

### Security Review Process

1. **Automated Security Scanning**
   - Dependencies are scanned for vulnerabilities
   - Code is analyzed for security patterns
   - Input validation is verified

2. **Manual Security Review**
   - Code review by security-conscious contributors
   - Threat model validation
   - Attack vector analysis

3. **Security Testing**
   - Input validation testing
   - Authentication bypass attempts
   - Rate limiting verification

## Testing Requirements

### Test Categories

#### Unit Tests
```javascript
// test/validation.test.js
import { isValidUsername, isValidPassword } from '../src/loginworker.js';

describe('Input Validation', () => {
  describe('Username Validation', () => {
    test('should accept valid usernames', () => {
      expect(isValidUsername('john_doe123')).toBe(true);
      expect(isValidUsername('user_123')).toBe(true);
    });
    
    test('should reject invalid usernames', () => {
      expect(isValidUsername('ab')).toBe(false); // Too short
      expect(isValidUsername('user@domain')).toBe(false); // Invalid chars
      expect(isValidUsername('')).toBe(false); // Empty
    });
  });
  
  describe('Password Validation', () => {
    test('should accept strong passwords', () => {
      expect(isValidPassword('Password123!')).toBe(true);
      expect(isValidPassword('MySecure99')).toBe(true);
    });
    
    test('should reject weak passwords', () => {
      expect(isValidPassword('password')).toBe(false); // No numbers
      expect(isValidPassword('12345678')).toBe(false); // No letters
      expect(isValidPassword('Pass1')).toBe(false); // Too short
    });
  });
});
```

#### Integration Tests
```javascript
// test/integration.test.js
import { unstable_dev } from 'wrangler';

describe('LoginWorker Integration', () => {
  let worker;
  
  beforeAll(async () => {
    worker = await unstable_dev('src/index.js', {
      experimental: { disableExperimentalWarning: true }
    });
  });
  
  afterAll(async () => {
    await worker.stop();
  });
  
  test('should handle valid login request', async () => {
    const response = await worker.fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        password: 'TestPass123!'
      })
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('success');
  });
});
```

#### Security Tests
```javascript
// test/security.test.js
describe('Security Tests', () => {
  test('should reject non-POST methods', async () => {
    const response = await worker.fetch('/', { method: 'GET' });
    expect(response.status).toBe(405);
  });
  
  test('should reject invalid content types', async () => {
    const response = await worker.fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'invalid data'
    });
    expect(response.status).toBe(415);
  });
  
  test('should sanitize malicious input', async () => {
    const response = await worker.fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin\x00\x01\x02',
        password: 'pass\r\n\t'
      })
    });
    // Should handle gracefully without crashing
    expect(response.status).toBeTruthy();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run security-specific tests
npm run test:security

# Run tests in watch mode during development
npm run test:watch
```

## Documentation

### Documentation Standards

#### Code Documentation
- Document all public functions and classes
- Include parameter types and descriptions
- Provide usage examples
- Document security considerations

#### README Updates
- Keep setup instructions current
- Update feature lists
- Maintain example code
- Update security guidelines

#### Changelog Maintenance
- Follow [Keep a Changelog](https://keepachangelog.com/) format
- Document breaking changes
- Include migration guides
- Note security improvements

### Documentation Examples

#### Function Documentation
```javascript
/**
 * Authenticates user credentials against the backend service
 * 
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.username - Username (validated format)
 * @param {string} credentials.password - Password (validated format)
 * @param {Object} env - Cloudflare environment variables
 * @param {string} env.BACKEND_AUTH_URL - Backend authentication endpoint
 * 
 * @returns {Promise<Object>} Authentication result
 * @returns {boolean} returns.success - Whether authentication succeeded
 * @returns {string} [returns.token] - JWT token if successful
 * @returns {string} returns.message - Result message
 * 
 * @throws {Error} When backend service is unavailable
 * 
 * @example
 * const result = await authenticateUser(
 *   { username: 'john_doe', password: 'SecurePass123!' },
 *   env
 * );
 * 
 * @security
 * - Credentials are validated before sending to backend
 * - No sensitive data is logged
 * - Generic error messages prevent information disclosure
 */
async function authenticateUser(credentials, env) {
  // Implementation
}
```

## Pull Request Process

### Before Submitting

1. **Update documentation** for any new features
2. **Add or update tests** for your changes
3. **Run the full test suite** and ensure all tests pass
4. **Run security checks** and address any issues
5. **Update CHANGELOG.md** with your changes
6. **Ensure code follows** our style guidelines

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Security fix

## Testing
- [ ] Tests pass locally
- [ ] New tests added for changes
- [ ] Security testing completed
- [ ] Integration testing performed

## Security
- [ ] No sensitive data exposed
- [ ] Input validation updated if needed
- [ ] No new attack vectors introduced
- [ ] Security documentation updated

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
```

### Review Process

1. **Automated Checks**
   - Linting and formatting
   - Security scanning
   - Test execution
   - Dependency checking

2. **Code Review**
   - Logic and implementation review
   - Security assessment
   - Performance considerations
   - Documentation quality

3. **Security Review**
   - Threat model validation
   - Input validation review
   - Error handling assessment
   - Attack vector analysis

### Merge Requirements

- ✅ All automated checks pass
- ✅ At least one approving review
- ✅ Security review if applicable
- ✅ Documentation updated
- ✅ Tests passing
- ✅ No merge conflicts

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Steps

1. **Update Version**
   ```bash
   npm version patch|minor|major
   ```

2. **Update CHANGELOG.md**
   - Move items from "Unreleased" to new version
   - Add release date
   - Update links

3. **Create Release PR**
   - Title: "Release v1.2.3"
   - Include changelog updates
   - Tag reviewers

4. **Create GitHub Release**
   - Tag the merge commit
   - Include changelog excerpt
   - Attach any artifacts

5. **Announce Release**
   - Update documentation
   - Notify users of breaking changes
   - Share security improvements

## Getting Help

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Security Issues** - security@yourproject.com (private)

### Resources

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [Security Guide](SECURITY.md) - Security best practices
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [JavaScript Security](https://owasp.org/www-community/vulnerabilities/)

### Common Questions

**Q: How do I test security features locally?**
A: Use the provided test.html file and try various input combinations. Run `npm run test:security` for automated security tests.

**Q: What if I find a security vulnerability?**
A: Please report security issues privately to security@yourproject.com. Do not create public GitHub issues for security vulnerabilities.

**Q: How do I add a new validation rule?**
A: Add the validation function to `loginworker.js`, include comprehensive tests, and update the documentation.

**Q: Can I add new dependencies?**
A: Yes, but they must be security-reviewed and serve a clear purpose. Avoid dependencies with known vulnerabilities.

## Recognition

Contributors are recognized in:
- CHANGELOG.md for significant contributions
- GitHub contributor statistics
- Release notes for major contributions
- Special recognition for security improvements

Thank you for contributing to LoginWorker! Your efforts help make authentication more secure for everyone. 🔐
