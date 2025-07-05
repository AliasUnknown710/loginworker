// Business logic: forwards credentials to backend for verification
export default async function handleLogin({ username, password }, env) {
  try {
    // Replace with your backend API endpoint
    const backendUrl = env.BACKEND_AUTH_URL

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    // Forward backend response as JSON
    const result = await response.json();

    // Optionally, filter/transform result here if needed
    return result;
  } catch (err) {
    // Log error if needed
    return { success: false, message: 'Backend authentication failed' };
  }
}
