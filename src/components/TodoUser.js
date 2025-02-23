import React, { useState, useEffect } from "react";
import ModalForm from "./ModelForm";

const ITEMS_PER_PAGE = 5;

const TodoUser = () => {
    const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "todos");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("currentPage")) || 1);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setTodos(storedTodos);
        setUsers(storedUsers);
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    const openModal = (item = null) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleSave = (name) => {
        if (!name.trim()) return;

        if (editingItem) {
            if (activeTab === "todos") {
                const updatedTodos = todos.map(todo => todo.name === editingItem.name ? { name } : todo);
                setTodos(updatedTodos);
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
            } else {
                const updatedUsers = users.map(user => user.name === editingItem.name ? { name } : user);
                setUsers(updatedUsers);
                localStorage.setItem("users", JSON.stringify(updatedUsers));
            }
        } else {
            if (activeTab === "todos") {
                const newTodos = [...todos, { name }];
                setTodos(newTodos);
                localStorage.setItem("todos", JSON.stringify(newTodos));
            } else {
                const newUsers = [...users, { name }];
                setUsers(newUsers);
                localStorage.setItem("users", JSON.stringify(newUsers));
            }
        }

        setModalOpen(false);
    };

    const removeItem = (name) => {
        if (activeTab === "todos") {
            const filteredTodos = todos.filter(todo => todo.name !== name);
            setTodos(filteredTodos);
            localStorage.setItem("todos", JSON.stringify(filteredTodos));
        } else {
            const filteredUsers = users.filter(user => user.name !== name);
            setUsers(filteredUsers);
            localStorage.setItem("users", JSON.stringify(filteredUsers));
        }
    };

    const dataList = activeTab === "todos" ? todos : users;
    // const totalPages = Math.max(1, Math.ceil(dataList.length / ITEMS_PER_PAGE));
    const paginatedData = dataList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
                <div className="btn-div border-bottom mb-3">
                    <button onClick={() => { setActiveTab("todos"); setCurrentPage(1); }} className={activeTab === "todos" ? "active-btn" : "normal-btn"}>
                        Todos
                    </button>
                    <button onClick={() => { setActiveTab("users"); setCurrentPage(1); }} className={activeTab === "users" ? "active-btn" : "normal-btn"}>
                        Users
                    </button>
                </div>

                <button onClick={() => openModal()} className="btn my-2 border px-3">
                    {activeTab === "todos" ? "Create Todo" : "Create User"}
                </button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className="nav-btn" onClick={() => openModal(item)}>Edit</button>
                                        |
                                        <button onClick={() => removeItem(item.name)} className="nav-btn">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="2" className="text-center">No Data Available</td></tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination right-pagination">
                    <button 
                        className="border rounded px-3 py-2"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                        disabled={currentPage === 1}>
                        &lt;
                    </button>
                    <span className="rounded px-3 py-2 mx-2 blue-border">{currentPage}</span>
                    <button 
                        className="border rounded px-3 py-2"
                        onClick={() => setCurrentPage(prev => prev + 1)} 
                        // disabled={currentPage >= totalPages}
                        >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
};

export default TodoUser;
