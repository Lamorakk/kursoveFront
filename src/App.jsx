import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const App = () => {
    return (
        <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Routes>
                </main>
            </React.Suspense>
        </Router>
    );
};

export default App;
