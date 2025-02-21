import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from '../redux/UserReducer';
import { addTodo } from '../redux/TodoReducer';
import { deleteTodo } from "../redux/TodoReducer";
import { deleteUser } from "../redux/UserReducer"; 
import { Spin } from 'antd';

async function wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
}

const TodoUserComponent = () => {

    const [activeTab, setActiveTab] = useState("todos");
    const [loading, setLoading] = useState(false);
    const [name,setName] = useState('');
    const [createBtn, setCreateBtn] = useState(true);

    const users = useSelector((state) => state.users);
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const todoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await wait(2000);
        dispatch(addTodo({name}));
        setLoading(false);
    }
    
    const userSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await wait(2000);
        dispatch(addUser({name}));
        setLoading(false);
    }

    const todoDelete = (name) => {
        dispatch(deleteTodo({ name })); 
    };

    const userDelete = (name) => {
        dispatch(deleteUser({ name }));
    };

    const submitHandle = async () => {
        setLoading(true);
        await wait(2000);
        if(activeTab == 'todos'){
            dispatch(addTodo({name}));
        } else {
            dispatch(addUser({name}));
        }
        setLoading(false);
        setCreateBtn(!createBtn);
    }

    return (
        <>
            {/* Create window */}
            {createBtn === false ? 
            <div className='d-flex min-vh-100 z-2 justify-content-center align-item-center'>
                <div className='w- z-90 border bg-secondary text-white p-5'>
                    <Spin spinning={loading}>
                        {activeTab === 'todos' ? (
                            <div className={`${createBtn ? '-top-[100vh]' : 'top-0'}`}>
                                <h3 className='text_color'>Add New ToDo</h3>
                                <form onSubmit={(e) => todoSubmit(e, addTodo)}>
                                    <div className='mb-3'>
                                        <label htmlFor='name'>Name</label>
                                        <input type='text' name='name' required className='form-control form-signin' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                                    </div>
                                    <button onClick={submitHandle} className='btn btn-primary' disabled={loading}>Submit</button>
                                    <button onClick={() => {setCreateBtn(!createBtn)}} className="btn btn-primary" >Close</button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <h3 className='text_color'>Add New User</h3>
                                <form onSubmit={(e) => userSubmit(e, addUser)}>
                                    <div className='mb-3'>
                                        <label htmlFor='name'>Name:</label>
                                        <input type='text' name='name' required className='form-control form-signin' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                                    </div>
                                    <button onClick={submitHandle} className='btn btn-primary' disabled={loading}>Submit</button>
                                    <button onClick={() => {setCreateBtn(!createBtn)}} className="btn btn-primary" >Close</button>
                                </form>
                            </div>
                        )}
                    </Spin>
                </div>
            </div> 
            : ''
            }
            

            {/* Home Page */}
            <div className="container z-0" style={{ marginTop: "2rem" }}>
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
                        <button value={createBtn} onClick={() => {setCreateBtn(!createBtn)}} className="btn my-2 border px-3">Create Todo</button>
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
                                                {/* <Link to={`/edit/${todo.name}`} className="nav-btn">Edit</Link>| */}
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
                        <button value={createBtn} onClick={() => {setCreateBtn(!createBtn)}} className="btn my-2 border px-3">Create User</button>
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
                                                {/* <Link to={`/edit/${user.name}`} className="nav-btn">Edit</Link>| */}
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
        </>
    );
};

export default TodoUserComponent;
