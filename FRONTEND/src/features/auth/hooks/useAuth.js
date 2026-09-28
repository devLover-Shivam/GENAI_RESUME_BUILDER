/*
 * AUTH HOOK LAYER:
 *
 * This layer acts as a bridge between the Context layer and the UI.
 *
 * It combines:
 * 1. Authentication state from AuthContext
 * 2. API functions from auth.api.js
 * 3. Loading and user state updates
 *
 * This keeps the UI components clean.
 *
 * Instead of writing API calls and setUser/setLoading logic inside
 * Login.jsx, Register.jsx, etc., we can simply use:
 *
 * const { handleLogin, handleLogout } = useAuth();
 *
 * So the architecture becomes:
 *
 * auth.api.js
 *      ↓
 * API requests
 *      ↓
 * auth.context.jsx
 *      ↓
 * Authentication state
 *      ↓
 * useAuth.js
 *      ↓
 * UI Components
 */

import { useContext } from "react";

// Import the authentication context to access global auth state
import { AuthContext } from "../services/auth.context";

// Import API functions that communicate with the backend
import {
    login,
    register,
    logout,
    getMe
} from "../services/auth.api";


// Custom hook that provides authentication functionality to UI components
export const useAuth = () => {

    // Access the authentication context
    const context = useContext(AuthContext);

    // Extract authentication state and its setter functions from Context
    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;


    // Handles user login
    const handleLogin = async ({ email, password }) => {

        // Tell the Context that an authentication operation has started
        setLoading(true);

        try{
            // Call the login API and receive the backend response
            const data = await login({ email, password });

            // Store the logged-in user's information in global state
            setUser(data.user);
        }catch(err){

        }finally{
            // Tell the Context that the authentication operation is complete
            setLoading(false);
        }

        
    };


    // Handles user registration
    const handleRegister = async ({ username, email, password }) => {

        // Tell the Context that registration is currently in progress
        setLoading(true);

        try {
            // Call the register API and receive the backend response
            const data = await register({
                username,
                email,
                password
            });

            // Store the newly registered user's information in global state
            setUser(data.user);
        } catch (err) {
            
        } finally{
                // Tell the Context that registration is complete
                setLoading(false);
        }

        
    };


    // Handles user logout
    const handleLogout = async () => {

        // Tell the Context that logout is currently in progress
        setLoading(true);

        try {
            // Call the logout API to invalidate the user's session/token
            await logout();

            // Remove the user from global authentication state
            setUser(null);
        } catch (err) {
            
        }finally{
            // Tell the Context that logout is complete
            setLoading(false);
        }

        
    };


    // Expose authentication state and handlers to UI components
    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};