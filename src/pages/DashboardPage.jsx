import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teamStats, setTeamStats] = useState({});

    useEffect(() => {
        // Запит на сервер для отримання задач
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error("Error fetching tasks:", error));

        // Запит на сервер для отримання проектів
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error));

        // Запит для статистики команди
        fetch('/api/team-stats')
            .then(response => response.json())
            .then(data => setTeamStats(data))
            .catch(error => console.error("Error fetching team stats:", error));
    }, []);

    return (
        <div className="dashboard">
            <h1>Дашборд</h1>

            <div className="stats">
                <h2>Статистика команди</h2>
                <div className="team-stats">
                    <div>Продуктивність: {teamStats.productivity}</div>
                    <div>Активних задач: {teamStats.activeTasks}</div>
                    <div>Проектів в роботі: {teamStats.activeProjects}</div>
                </div>
            </div>

            <div className="tasks">
                <h2>Мої задачі</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>
            </div>

            <div className="projects">
                <h2>Мої проекти</h2>
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
