import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const PasswordResetForm = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/auth/reset-password/${token}`, { password });
            setMessage("Password has been reset successfully!");
        } catch (err) {
            setMessage("Failed to reset password.");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordResetForm;
