import "./CSS/AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1>Welcome to Our Company</h1>
            <p>
                Dear friend, welcome to our company! We are thrilled to have you here
                and excited to work with you. At our company, we believe in innovation,
                teamwork, and creating value for our clients. Our team is dedicated to
                providing high-quality solutions and services that make a real
                difference. Whether you&#39;re here as a customer or a partner, we look
                forward to building a lasting relationship with you.
            </p>

            <div className="images-container">
                <img src="path_to_image1.jpg" alt="Teamwork" />
                <img src="path_to_image2.jpg" alt="Our Office" />
                <img src="path_to_image3.jpg" alt="Collaboration" />
            </div>

            <h2>Our Location</h2>
            <div className="location-container">
                <p>We are based at Bohdan Lepkyy 28, Ivano-Frankivsk, Ukraine. Feel free to visit us or get in touch.</p>
                <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=24.7155,48.9191,24.7225,48.9220&amp;layer=mapnik"
                    width="600"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabindex="0"
                ></iframe>
                <p>Address: Bohdan Lepkyy 28, Ivano-Frankivsk, Ukraine</p>
            </div>

            <footer className="footer">
                <p>&copy; 2024 Our Company | All rights reserved</p>
            </footer>
        </div>
    );
};

export default AboutPage;
