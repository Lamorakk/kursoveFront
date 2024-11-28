import React, { useState } from 'react';
import { registerUser, loginUser } from './api';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isRegister
                ? await registerUser(email, password)
                : await loginUser(email, password);
            setMessage(response);
        } catch (error) {
            setMessage('Щось пішло не так');
        }
    };

    return (
        <div>
            <h2>{isRegister ? 'Реєстрація' : 'Вхід'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegister ? 'Реєстрація' : 'Вхід'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Вже маєте акаунт? Увійти' : 'Немає акаунта? Зареєструватись'}
            </button>
            <p>{message}</p>
        </div>
    );
};

export default AuthForm;
