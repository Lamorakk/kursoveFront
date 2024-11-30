import { useState, useEffect } from "react";
import api from "../services/api"; // Імпортуємо наш Axios API-сервіс
import "./CSS/DashboardPage.css";

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [teamStats, setTeamStats] = useState({
        productivity: null,
        activeTasks: null,
        activeProjects: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Завантаження даних проектів
    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.message) {
                setProjects([]);  // Якщо проектів немає
                setError(response.data.message); // Виводимо повідомлення
            } else {
                setProjects(response.data); // Якщо є проекти
                setError(null);  // Якщо немає помилки
            }
        } catch (err) {
            setError("Failed to load projects.");
            console.error(err);
        }
    };

    // Завантаження статистики команди
    const fetchTeamStats = async () => {
        try {
            setTeamStats({
                productivity: 85,
                activeTasks: 10,
                activeProjects: projects.length,
            });
        } catch (err) {
            console.error(err);
        }
    };

    // Виконуємо запити під час завантаження
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Скидаємо помилки перед новим запитом
            await fetchProjects();
            await fetchTeamStats();
            setLoading(false);
        };
        fetchData();
    }, []); // Без залежностей, щоб запит виконувався лише при першому рендері

    // Якщо триває завантаження, показуємо Loading
    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            {/* Ліва панель */}
            <aside className="left-menu">
                <h2>Projects</h2>
                {/* Відображення помилки */}
                {error ? (
                    <p className="error-message">{error}</p>
                ) : projects.length > 0 ? (
                    <ul className="project-list">
                        {projects.map((project) => (
                            <li key={project.id} className="project-item">
                                <h3>{project.name}</h3>
                                <p>Responsible: {project.responsibleDev}</p>
                                <p>Progress: {project.progress}%</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-projects">You have no projects.</p>
                )}
            </aside>

            {/* Права секція */}
            <section className="right-dashboard">
                <h1>Dashboard</h1>
                {teamStats.productivity || teamStats.activeTasks || teamStats.activeProjects ? (
                    <div className="stat-section">
                        <h2>Team Stats</h2>
                        <p>Productivity: {teamStats.productivity}%</p>
                        <p>Active Tasks: {teamStats.activeTasks}</p>
                        <p>Active Projects: {teamStats.activeProjects}</p>
                    </div>
                ) : (
                    <p>No stats available.</p>
                )}
            </section>
        </div>
    );
};

export default DashboardPage;
