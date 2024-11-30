import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            fetch("/api/user/current", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.ok ? res.json() : Promise.reject(res))
                .then(setUser)
                .catch(() => {
                    logout();
                });
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("authToken", userData.token);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authToken");
        window.location.href = "/login"; // Use window.location instead of navigate
    };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            fetch("/api/user/current", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => setUser(data))
                .catch(() => localStorage.removeItem("authToken"))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <div>Loading...</div>; // Fallback while checking auth


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
