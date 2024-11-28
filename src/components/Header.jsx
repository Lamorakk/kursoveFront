import './Header.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [teamMenuOpen, setTeamMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetch('/api/user/current', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    if (data) setUser(data);
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

    const handleLogout = () => {
        fetch('/api/logout', { method: 'POST' })
            .then(() => {
                setUser(null);
                localStorage.removeItem('authToken');
                navigate('/login');
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <header className="header">
            <div className="menu">
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                <div className="dropdown-container">
                    <button onClick={() => setTeamMenuOpen(!teamMenuOpen)}>
                        Команди
                    </button>
                    {teamMenuOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                {user?.teams?.length ? (
                                    user.teams.map((team) => <li key={team.id}>{team.name}</li>)
                                ) : (
                                    <li className="empty">У вас немає команд</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <button onClick={() => navigate('/about')}>Про нас</button>
                <button onClick={() => navigate('/projects/new')}>Створити новий проект</button>
            </div>
            <div className="logo">
                <a href="/">SigmaSoft</a>
            </div>
            <div className="user-panel">
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
