import { Link } from "react-router-dom"; // Для створення посилань
import "./CSS/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Our Amazing Platform</h1>
            <p>Your journey starts here. Let&#39;s build something great together!</p>

            <div className="cta-buttons">
                <Link to="/about">
                    <button className="cta-button">Learn More About Us</button>
                </Link>

                <div className="auth-buttons">
                    <Link to="/register">
                        <button className="cta-button">Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button className="cta-button">Login</button>
                    </Link>
                </div>
            </div>

            <div className="home-footer">
                <p>Explore our platform and discover more. Join the team!</p>
            </div>
        </div>
    );
};

export default HomePage;
