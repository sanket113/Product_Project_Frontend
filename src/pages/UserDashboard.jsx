import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const APP_NAME = 'Manage Your Tasks';

const UserDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        fetchProfile();
        fetchTasks();
    }, []);

    // ================= PROFILE =================
    const fetchProfile = async () => {
        try {
            const res = await api.get('/user/profile');
            setProfile(res.data);
        } catch {
            setError('Failed to fetch profile');
        }
    };

    // ================= TASKS =================
    const fetchTasks = async () => {
        try {
            const res = await api.get('/api/tasks');
            setTasks(res.data);
        } catch {
            setError('Failed to fetch tasks');
        }
    };

    // ================= CREATE =================
    const createTask = async () => {
        if (!title.trim()) return;
        await api.post('/api/tasks', { title, description });
        setTitle('');
        setDescription('');
        fetchTasks();
    };

    // ================= MOVE =================
    const moveTask = async (task, status) => {
        await api.put(`/api/tasks/${task.id}`, { status });
        fetchTasks();
    };

    // ================= EDIT =================
    const saveEdit = async () => {
        await api.put(`/api/tasks/${editTask.id}`, editTask);
        setEditTask(null);
        fetchTasks();
    };

    // ================= DELETE =================
    const deleteTask = async (id) => {
        await api.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    if (error) return <p className="error-msg">{error}</p>;
    if (!profile) return <p>Loading...</p>;

    const role = profile.role;
    const todoTasks = tasks.filter(t => t.status === 'TODO');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    const canViewBoard = ['USER', 'MANAGER', 'SUPER_ADMIN'].includes(role);

    return (
        <div className="container">

            {/* ================= APP HEADER ================= */}
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>{APP_NAME}</h1>
                <p style={{ opacity: 0.7 }}>
                    Welcome {profile.username} ({role})
                </p>
            </header>

            {/* ================= CREATE TASK ================= */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3>Create Task</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={createTask}>Add</button>
                </div>
            </div>

            {/* ================= KANBAN BOARD ================= */}
            {canViewBoard && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    
                    <KanbanColumn
                        title="TODO"
                        tasks={todoTasks}
                        onMove={(task) => moveTask(task, 'DONE')}
                        onEdit={setEditTask}
                        onDelete={deleteTask}
                        moveLabel="→ Done"
                    />

                    <KanbanColumn
                        title="DONE"
                        tasks={doneTasks}
                        onMove={(task) => moveTask(task, 'TODO')}
                        onEdit={setEditTask}
                        onDelete={deleteTask}
                        moveLabel="← Todo"
                    />
                </div>
            )}

            {/* ================= EDIT MODAL ================= */}
            {editTask && (
                <div className="modal-backdrop">
                    <div className="glass-card">
                        <h3>Edit Task</h3>
                        <input
                            value={editTask.title}
                            onChange={(e) =>
                                setEditTask({ ...editTask, title: e.target.value })
                            }
                        />
                        <input
                            value={editTask.description || ''}
                            onChange={(e) =>
                                setEditTask({ ...editTask, description: e.target.value })
                            }
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={() => setEditTask(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ================= COLUMN =================
const KanbanColumn = ({ title, tasks, onMove, onEdit, onDelete, moveLabel }) => (
    <div className="glass-card">
        <h3 style={{ textAlign: 'center' }}>{title}</h3>

        {tasks.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.6 }}>No tasks</p>
        ) : (
            tasks.map(task => (
                <div
                    key={task.id}
                    style={{
                        background: 'rgba(255,255,255,0.07)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '0.5rem'
                    }}
                >
                    <strong>{task.title}</strong>
                    {task.description && <p>{task.description}</p>}

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => onMove(task)}>{moveLabel}</button>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button
                            style={{ background: '#dc2626' }}
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))
        )}
    </div>
);

export default UserDashboard;
