import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Додано useNavigate
import "./CSS/LoginPage.css";
import { loginUser } from "../services/api";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Ініціалізація navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await loginUser(formData.email, formData.password);
            setMessage("Login successful! Redirecting...");
            localStorage.setItem("authToken", response.token); // Змінено з "token" на "authToken"
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <div className="login-container">
                    <h1>Login</h1>
                    {message && (
                        <div>
                            <p className="success-message">{message}</p>
                            <p>
                                <a href="/dashboard">Go to Dashboard</a>
                            </p>
                        </div>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </form>
                    <div className="extra-links">
                        <a href="/reset-password">Forgot Password?</a>
                        <br />
                        <a href="/register">Don&#39;t have an account? Sign up</a>
                    </div>
                </div>
            </div>
            <div className="right-section"></div>
        </div>
    );
};

export default LoginPage;
