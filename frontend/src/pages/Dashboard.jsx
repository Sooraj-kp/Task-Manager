import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [message, setMessage] = useState("");
    
    // New states for filtering, editing and search
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState("Medium");

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const token = localStorage.getItem("token");

    // Apply dark mode on toggle
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(response.data.tasks);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to load tasks"
            );
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setMessage("Task title is required");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    title,
                    description,
                    priority
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTitle("");
            setDescription("");
            setPriority("Medium");
            setMessage("Task created successfully");

            fetchTasks();
            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to create task"
            );
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        
        try {
            await axios.delete(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Task deleted successfully");
            fetchTasks();
            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to delete task"
            );
        }
    };

    const updateTaskStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update task status"
            );
        }
    };
    
    const startEditing = (task) => {
        setEditingTaskId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditPriority(task.priority || "Medium");
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
        setEditPriority("Medium");
    };

    const saveEdit = async (id) => {
        if (!editTitle.trim()) {
            setMessage("Task title cannot be empty");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { 
                    title: editTitle,
                    description: editDescription,
                    priority: editPriority
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Task updated successfully");
            setEditingTaskId(null);
            fetchTasks();
            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update task"
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    // Derived states
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const progress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

    // Filter tasks before rendering
    const filteredTasks = tasks.filter(task => {
        const matchesFilter = filter === "all" || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div>
            <div className="dashboard-header">
                <h1>Task Manager</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button 
                        onClick={() => setDarkMode(!darkMode)} 
                        className="btn-small btn-secondary"
                        title="Toggle Dark Mode"
                    >
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button onClick={handleLogout} className="btn-small">
                        Logout
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Overall Progress</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--border)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ 
                        height: '100%', 
                        backgroundColor: 'var(--primary)', 
                        width: `${progress}%`,
                        transition: 'width 0.3s ease-in-out'
                    }}></div>
                </div>
            </div>

            {message && <div className="message-alert">{message}</div>}

            <form onSubmit={handleSubmit} className="dashboard-form">
                <div>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        placeholder="Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Priority</label>
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit">
                    Add Task
                </button>
            </form>

            <hr />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ margin: 0 }}>Task List</h3>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)', maxWidth: '200px' }}
                    />
                    
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <label style={{ fontSize: '0.9rem', margin: 0 }}>Filter:</label>
                        <select 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ padding: '0.4rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border)' }}
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <p className="text-center">No tasks found.</p>
            ) : (
                filteredTasks.map((task) => (
                    <div key={task._id} className="task-card">
                        {editingTaskId === task._id ? (
                            // Edit Mode
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Task title"
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Task description"
                                />
                                <select 
                                    value={editPriority} 
                                    onChange={(e) => setEditPriority(e.target.value)}
                                    style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <div className="task-actions">
                                    <button 
                                        className="btn-small" 
                                        onClick={() => saveEdit(task._id)}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        className="btn-small btn-secondary" 
                                        onClick={cancelEditing}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // View Mode
                            <>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                    <div className="task-status">
                                        Status: <strong>{task.status}</strong>
                                    </div>
                                    <div className="task-status">
                                        Priority: <strong style={{ 
                                            color: task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#10b981' 
                                        }}>{task.priority || 'Medium'}</strong>
                                    </div>
                                </div>

                                <div className="task-actions">
                                    {task.status === "pending" ? (
                                        <button
                                            className="btn-small btn-secondary"
                                            onClick={() =>
                                                updateTaskStatus(
                                                    task._id,
                                                    "completed"
                                                )
                                            }
                                        >
                                            Mark Completed
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-small btn-secondary"
                                            onClick={() =>
                                                updateTaskStatus(
                                                    task._id,
                                                    "pending"
                                                )
                                            }
                                        >
                                            Mark Pending
                                        </button>
                                    )}

                                    <button
                                        className="btn-small btn-secondary"
                                        onClick={() => startEditing(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-small btn-danger"
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;