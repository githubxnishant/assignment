import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/UserReducer";
import { addTodo, deleteTodo, updateTodo } from "../redux/TodoReducer";
import ModalForm from "./ModelForm";

const ITEMS_PER_PAGE = 3;

const TodoUser = () => {
    const [activeTab, setActiveTab] = useState("todos");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const todos = useSelector((state) => state.todos);

    const openModal = (item = null) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleSave = async (name) => {
        if (editingItem) {
            if (activeTab === "todos") {
                dispatch(updateTodo({ name: editingItem.name, newName: name }));
            } else {
                dispatch(updateUser({ name: editingItem.name, newName: name }));
            }
        } else {
            if (activeTab === "todos") {
                dispatch(addTodo({ name }));
            } else {
                dispatch(addUser({ name }));
            }
        }
        setModalOpen(false);
    };

    const remove = (name) => {
        if (activeTab === "todos") {
            dispatch(deleteTodo({ name }));
        } else {
            dispatch(deleteUser({ name }));
        }
    };

    const dataList = activeTab === "todos" ? todos : users;
    const totalPages = Math.ceil(dataList.length / ITEMS_PER_PAGE);
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
                    <button onClick={() => setActiveTab("todos")} className={`mb-3 ${activeTab === "todos" ? "active-btn" : "normal-btn"}`}>
                        Todo
                    </button>
                    <button onClick={() => setActiveTab("users")} className={`mb-3 ${activeTab === "users" ? "active-btn" : "normal-btn"}`}>
                        User
                    </button>
                </div>

                <button onClick={() => openModal()} className="btn my-2 border px-3">
                    {activeTab === "todos" ? "Create Todo" : "Create User"}
                </button>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="bg-light">Name</th>
                            <th className="bg-light">Action</th>
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
                                        <button onClick={() => remove(item.name)} className="nav-btn">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="2" className="text-center">No {activeTab === "todos" ? "Todos" : "Users"} Found</td></tr>
                        )}
                    </tbody>
                </table>

                {dataList.length > 0 && (
                    <div className="pagination">
                        <button 
                            className="border rounded px-3 py-2"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}>
                            &lt;
                        </button>
                        <span className="rounded px-3 py-2 mx-2 blue-border">{currentPage}</span>
                        <button 
                            className="border rounded px-3 py-2"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}>
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default TodoUser;
