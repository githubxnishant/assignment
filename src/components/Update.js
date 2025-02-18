import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/UserReducer';
import { updateTodo } from '../redux/TodoReducer';

const Update = () => {

    const [activeTab, setActiveTab] = useState('todos');

    const { name } = useParams();

    const users = useSelector((state) => state.users);
    const todos = useSelector((state) => state.todos);
    
    const existingUser = users?.find((user) => user.name === name) || {}; 
    const existingTodo = todos?.find((todo) => todo.name === name) || {};

    const [uname, setUName] = useState(existingUser?.name || ''); 
    const [tname, setTName] = useState(existingTodo?.name || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const todoUpdate = (event) => {
        event.preventDefault();
        dispatch(
            updateTodo({
                name: existingTodo.name,
                newName: tname, 
            })
        );
        navigate('/');
    };

    const userUpdate = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                name: existingUser.name, 
                newName: uname,
            })
        );
        navigate('/');
    };

    return (
        <div className='d-flex w-60 vh-50 justify-content-center align-items-center mt-5'>
            <div className=' border bg-secondary text-white p-5'>
                <div className='create-btn border-bottom mb-3'>
                    <button onClick={() => {setActiveTab('todos')}} className={`mb-3 ${activeTab === 'todos' ? 'active-btn' : 'normal-btn' }`}>Todo</button>
                    <button onClick={() => {setActiveTab('users')}} className={`mb-3 ${activeTab === 'users' ? 'active-btn' : 'normal-btn' }`}>User</button>
                </div>
                
                {activeTab === 'todos' 
                ?
                    <div>
                        <h3 className='text_color'>Update Todo</h3>
                        <form onSubmit={todoUpdate}>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={tname || ''}
                                    className='form-control'
                                    placeholder='Enter todo name'
                                    onChange={(e) => setTName(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-primary'>Update</button>
                        </form>
                    </div>
                :
                    <div>
                        <h3 className='text_color'>Update User</h3>
                        <form onSubmit={userUpdate}>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={uname || ''}
                                    className='form-control'
                                    placeholder='Enter user name'
                                    onChange={(e) => setUName(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-primary'>Update</button>
                        </form>
                    </div> 
                }
            </div>
        </div>
    );
}

export default Update;
