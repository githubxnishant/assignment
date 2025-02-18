import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo } from "../redux/TodoReducer";
import { deleteUser } from "../redux/UserReducer"; 

const TodoUserComponent = () => {
    const [activeTab, setActiveTab] = useState("todos");

    const users = useSelector((state) => state.users);
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const todoDelete = (name) => {
        console.log("Deleting todo:", name);
        dispatch(deleteTodo({ name })); 
    };

    const userDelete = (name) => {
        console.log("Deleting user:", name);
        dispatch(deleteUser({ name }));
    };

    return (
        <div className="container" style={{ marginTop: "2rem" }}>
            <div className="btn-div border-bottom mb-3">
                <button
                    onClick={() => setActiveTab("todos")}
                    className={`mb-3 ${activeTab === "todos" ? "active-btn" : "normal-btn"}`}
                >
                    Todo
                </button>
                <button
                    onClick={() => setActiveTab("users")}
                    className={`mb-3 ${activeTab === "users" ? "active-btn" : "normal-btn"}`}
                >
                    User
                </button>
            </div>

            {activeTab === "todos" ? (
                <div>
                    <Link to="/create" className="btn my-2 border px-3">Create Todo</Link>
                    <table className="table">
                        <thead>
                            <tr className="table-div">
                                <th className="thead">Name</th>
                                <th className="thead">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.length > 0 ? (
                                todos.map((todo, index) => (
                                    <tr key={index}>
                                        <td>{todo.name}</td>
                                        <td>
                                            <Link to={`/edit/${todo.name}`} className="nav-btn">Edit</Link>|
                                            <button
                                                onClick={() => todoDelete(todo.name)}
                                                className="nav-btn"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No Todos Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <Link to="/create" className="btn my-2 border px-3">Create User</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="thead">Name</th>
                                <th className="thead">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>
                                            <Link to={`/edit/${user.name}`} className="nav-btn">Edit</Link>|
                                            <button
                                                onClick={() => userDelete(user.name)}
                                                className="nav-btn"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No Users Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TodoUserComponent;
