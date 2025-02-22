import React, { useState } from "react";
import ModalForm from './ModelForm';

const Home = () => {
    const [activeTab, setActiveTab] = useState("todos");
    const [modalOpen, setModalOpen] = useState(false); 
    const [editingItem, setEditingItem] = useState(null); 
    const [todos, setTodos] = useState([]); 
    const [users, setUsers] = useState([]); 

    // Open modal for creating/editing
    const openModal = (item = null) => {
        setEditingItem(item);
        setModalOpen(true);
    };
    // Handle when save button is clicked
    const handleSave = async (name) => {
        if (editingItem) {
            if (activeTab === "todos") {
                setTodos(todos.map(todo => todo.name === editingItem.name ? { name } : todo));
            } else {
                setUsers(users.map(user => user.name === editingItem.name ? { name } : user));
            }
        } else {
            if (activeTab === "todos") {
                setTodos([...todos, { name }]);
            } else {
                setUsers([...users, { name }]);
            }
        }
        setModalOpen(false);
    };
    

    // Delete a record
    const removeItem = (name) => {
        if (activeTab === "todos") {
            setTodos(todos.filter(todo => todo.name !== name));
        } else {
            setUsers(users.filter(user => user.name !== name));
        }
    };

    return (
        <>
            <ModalForm
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                initialValue={editingItem?.name || ""}
                title={editingItem ? `Edit ${activeTab === "todos" ? "Todo" : "User"}` : `Add ${activeTab === "todos" ? "Todo" : "User"}`}
            />

            <div className="container mt-4">
                {/* Tab Switching Buttons */}
                <div className="btn-div border-bottom mb-3">
                    <button onClick={() => setActiveTab("todos")} className={activeTab === "todos" ? "active-btn" : "normal-btn"}>
                        Todo
                    </button>
                    <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active-btn" : "normal-btn"}>
                        User
                    </button>
                </div>
                
                {/* Create Button */}
                <button onClick={() => openModal()} className="btn my-2 border px-3">
                    {activeTab === "todos" ? "Create Todo" : "Create User"}
                </button>

                {/* Display List */}
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#fafafa" }}>Name</th>
                            <th style={{ backgroundColor: "#fafafa" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeTab === "todos"
                            ? todos.length > 0
                                ? todos.map((todo, index) => (
                                    <tr key={index}>
                                        <td>{todo.name}</td>
                                        <td>
                                            <button className="nav-btn" onClick={() => openModal(todo)}>Edit</button>
                                            |
                                            <button onClick={() => removeItem(todo.name)} className="nav-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan="2" className="text-center">No Todos Found</td></tr>
                            : users.length > 0
                                ? users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>
                                            <button className="nav-btn" onClick={() => openModal(user)}>Edit</button>
                                            |
                                            <button onClick={() => removeItem(user.name)} className="nav-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan="2" className="text-center">No Users Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;
