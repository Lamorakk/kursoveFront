import {useState} from "react";
import "./CSS/ResetPasswordPage.css";
import api from "../services/api.js"; // або замінити на відповідний шлях до стилів

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/reset-password", { email });
            alert("Password reset link sent!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };


    return (
        <div className="container">
            <div className="left-section">
                <div className="login-container">
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Enter your email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <button className="reset-button" type="submit">
                            Reset Password
                        </button>
                    </form>
                    <div className="extra-links">
                        <a href="/login">Back to Login</a>
                    </div>
                </div>
            </div>
            <div className="right-section"></div>
        </div>
    );
};

export default ResetPasswordPage;
