export default {
    async fetch(request, env, ctx) {
        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        let body;
        try {
            body = await request.json();
        } catch (e) {
            return new Response("Invalid JSON", { status: 400 });
        }

        const { username, password } = body;
        if (!username || !password) {
            return new Response("Missing username or password", { status: 400 });
        }

        // Use the secret variable for the signup API URL
        const signupApiUrl = env.signup_api_url;

        // Example fetch to the signup API (no Python backend interaction)
        const apiResponse = await fetch(signupApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const apiResult = await apiResponse.json();

        return new Response(JSON.stringify({
            status: "success",
            message: "Signup API called.",
            apiResult
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
};
