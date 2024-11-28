import { useEffect, useState } from "react";

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // Ініціалізуємо стан для tasks

    useEffect(() => {
        fetch("http://localhost:8080/api/tasks") // Виконання запиту
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status); // Обробка HTTP помилки
                }
                return response.json();
            })
            .then((data) => {
                console.log("Отримані дані:", data); // Виводимо отримані дані в консоль
                setTasks(data); // Оновлюємо стан
            })
            .catch((error) => console.error("Fetch error:", error)); // Логування помилок
    }, []);

    console.log("Поточний стан tasks:", tasks); // Перевіряємо, чи оновлюється стан

    return (
        <div>
            <h1>Список завдань</h1>
            <ul>
                {tasks.length > 0 ? ( // Перевіряємо, чи є завдання
                    tasks.map((task) => (
                        <li key={task.id}>
                            {task.title} {task.completed ? "(Виконано)" : "(Не виконано)"}
                        </li>
                    ))
                ) : (
                    <p>Завантаження або завдань немає...</p>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
