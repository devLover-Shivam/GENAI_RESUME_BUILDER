import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {

    const { loading, user } = useAuth();

    // Show loading UI while authentication state is being checked
    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    // Redirect unauthenticated users to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Allow authenticated users to access the protected page
    return children;
};

export default Protected;