import './Header.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null); // State for user data
    const [menuOpen, setMenuOpen] = useState(false); // State for the dropdown menu
    const [taskMenuOpen, setTaskMenuOpen] = useState(false); // Task dropdown menu state
    const [projectMenuOpen, setProjectMenuOpen] = useState(false); // Project dropdown menu state
    const [loading, setLoading] = useState(true); // Loading state for API request
    const navigate = useNavigate();

    // Check if user is logged in by checking localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Переконайтесь, що отримуєте authToken
        if (token) {
            fetch('/api/user/current', {
                headers: {
                    'Authorization': `Bearer ${token}` // Підтримка authToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setUser(data); // Отримання даних користувача
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);
 // Runs once on component mount

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    };

    const handleLogout = () => {
        fetch('/api/logout', { method: 'POST' })
            .then(() => {
                setUser(null); // Clear the user state
                localStorage.removeItem('authToken'); // Remove token from localStorage
                navigate('/login'); // Redirect to login page
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    // Display a loading message if the data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <header className="header">
            <div className="menu">
                <button onClick={() => setTaskMenuOpen(!taskMenuOpen)}>
                    Мої завдання
                </button>
                {taskMenuOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>Всі завдання</li>
                            <li>Нещодавні</li>
                            <li>Проекти</li>
                        </ul>
                    </div>
                )}
                <button onClick={() => setProjectMenuOpen(!projectMenuOpen)}>
                    Мої проекти
                </button>
                {projectMenuOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>Мої проекти</li>
                            <li>Створити новий проект</li>
                            <li><a href="/projects">Подивитися всі проекти</a></li>
                        </ul>
                    </div>
                )}
                <button>Дашборд</button>
                <button>Мої команди</button>
                <button>Плани</button>
            </div>
            <div className="logo">
                <a href="/">SigmaSoft</a>
            </div>
            <div className="user-panel">
                <input type="text" placeholder="Пошук по задачах..." />
                {user ? (
                    <div className="user-menu">
                        <div
                            className="user-avatar"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {user.profileImageUrl ? (
                                <img
                                    src={user.profileImageUrl}
                                    alt="User Avatar"
                                    className="profile-img"
                                />
                            ) : (
                                <span className="initials">
                                    {getInitials(user.name)}
                                </span>
                            )}
                        </div>
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <div className="profile-header">
                                    <img
                                        src={user.profileImageUrl || '/default-avatar.png'}
                                        alt="User Avatar"
                                        className="menu-avatar"
                                    />
                                    <span>{user.name}</span>
                                </div>
                                <ul>
                                    <li><a href="/profile">Особистий кабінет</a></li>
                                    <li><a href="/messages">Повідомлення</a></li>
                                    <li><a href="/settings">Налаштування</a></li>
                                    <li onClick={handleLogout}>Вийти з акаунту</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <a href="/login"><button>Log In</button></a>
                        <a href="/register"><button>Sign Up</button></a>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
