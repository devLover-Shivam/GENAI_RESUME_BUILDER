import { createContext, useState } from "react";

/*
 * AUTH CONTEXT LAYER:
 *
 * This layer manages authentication-related state globally.
 * Instead of passing user information through props to every component,
 * any component inside AuthProvider can access the authentication state
 * using AuthContext.
 *
 * For example:
 * Login.jsx    → update user
 * Navbar.jsx   → read user
 * Profile.jsx  → read user
 * ProtectedRoute → check whether user exists
 *
 * So, AuthContext acts as a central place for managing authentication state.
 */

// Create a Context object that will store and share authentication data
export const AuthContext = createContext();


// AuthProvider is the component that provides authentication state to its children
export const AuthProvider = ({ children }) => {

    // Stores the currently logged-in user's information
    // null means that no user is currently logged in
    const [user, setUser] = useState(null);

    // Tracks whether authentication-related data is currently being loaded
    // false means that nothing is currently loading
    const [loading, setLoading] = useState(false);


    // Provide authentication state and its update functions to all child components
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >

            {/* Render all components wrapped inside AuthProvider */}
            {children}

        </AuthContext.Provider>
    );
};