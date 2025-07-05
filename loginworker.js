// Business logic: forwards credentials to backend for verification
function sanitizeInput(input) {
  // Remove leading/trailing whitespace and control characters
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

function isValidUsername(username) {
  // Example: 3-32 chars, alphanumeric and underscores only
  return typeof username === 'string' &&
    /^[a-zA-Z0-9_]{3,32}$/.test(username);
}

function isValidPassword(password) {
  // Example: 8-64 chars, at least one letter and one number
  return typeof password === 'string' &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,64}$/.test(password);
}

export default async function handleLogin({ username, password }, env) {
  // Sanitize input
  if (typeof username === 'string') username = sanitizeInput(username);
  if (typeof password === 'string') password = sanitizeInput(password);

  // Strong input validation
  if (!isValidUsername(username) || !isValidPassword(password)) {
    return { success: false, message: 'Invalid username or password format' };
  }

  try {
    const backendUrl = env.BACKEND_AUTH_URL;
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    // Only return necessary fields
    return {
      success: result.success,
      token: result.token, // if applicable
      message: result.message
    };
  } catch (err) {
    // Optionally log error details securely
    return { success: false, message: 'Backend authentication failed' };
  }
}
