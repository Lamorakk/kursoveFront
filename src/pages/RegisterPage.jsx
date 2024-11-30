import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react'; // Import useContext
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { registerUser } from "../services/api";

const RegistrationPage = () => {
    const { login } = useContext(AuthContext); // Access the login function from context
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            await registerUser(formData.email, formData.password);
            setMessage("Registration successful! Redirecting...");
            setTimeout(() => {
                login({ name: formData.name, email: formData.email }); // Call the login from context
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            setError("Registration failed: " + err.message);
        }
    };


    return (
        <div className="container">
            <div className="left-section">
                <div className="registration-container">
                    <h1>Register</h1>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                            />
                        </div>
                        <button className="register-button" type="submit">
                            Register
                        </button>
                    </form>
                    <div className="extra-links">
                        <a href="/login">Already have an account? Log in</a>
                    </div>
                </div>
            </div>
            <div className="right-section"></div>
        </div>
    );
};

export default RegistrationPage;

