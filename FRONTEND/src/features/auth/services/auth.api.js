import axios from "axios";

// Create a reusable Axios instance for all API requests
const api = axios.create({
    baseURL: "http://localhost:3000",

    // Allows the browser to send and receive cookies with cross-origin requests
    // Important because our JWT authentication token is stored inside a cookie
    withCredentials: true
});

// Register a new user
export async function register({ username, email, password }) {
    try {
        // Send user registration details to the backend
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });

        return response.data;
    } catch (err) {
        // Log the error if registration fails
        console.log(err);
    }
}

// Login an existing user
export async function login({ email, password }) {
    try {
        // Send login credentials to the backend
        // Backend sends the JWT token back through a cookie
        const response = await api.post("/api/auth/login", {
            email,
            password
        });

        return response.data;
    } catch (err) {
        // Log the error if login fails
        console.log(err);
    }
}

// Logout the currently logged-in user
export async function logout() {
    try {
        // Send logout request along with the authentication cookie
        const response = await api.get("/api/auth/logout");

        return response.data;
    } catch (err) {
        // Log the error if logout fails
        console.log(err);
    }
}

// Get details of the currently logged-in user
export async function getMe() {
    try {
        // Send the request with the JWT cookie so the backend can authenticate the user
        const response = await api.get("/api/auth/get-me");

        return response.data;
    } catch (err) {
        // Log the error if fetching user details fails
        console.log(err);
    }
}