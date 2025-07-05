export default {
    async fetch(request, env, ctx) {
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405 });
        }

        try {
            const { username, password } = await request.json();

            // Replace with your authentication logic
            if (username === env.LOGIN_USERNAME && password === env.LOGIN_PASSWORD) {
                // Example: return a simple token
                return new Response(JSON.stringify({ token: 'example-token' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                return new Response('Unauthorized', { status: 401 });
            }
        } catch (err) {
            return new Response('Bad Request', { status: 400 });
        }
    }
};