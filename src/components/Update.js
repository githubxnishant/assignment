import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/UserReducer';
import { updateTodo } from '../redux/TodoReducer';
import { Spin } from 'antd';

async function wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
}

const Update = () => {

    const [activeTab, setActiveTab] = useState('todos');
    const [loading, setLoading] = useState(false);

    const { name } = useParams();

    const users = useSelector((state) => state.users);
    const todos = useSelector((state) => state.todos);
    
    const existingUser = users?.find((user) => user.name === name) || {}; 
    const existingTodo = todos?.find((todo) => todo.name === name) || {};

    const [uname, setUName] = useState(existingUser?.name || ''); 
    const [tname, setTName] = useState(existingTodo?.name || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const todoUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        await wait(2000);
        dispatch(
            updateTodo({
                name: existingTodo.name,
                newName: tname, 
            })
        );
        setLoading(false);
        navigate('/');
    };

    const userUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        await wait(2000);
        dispatch(
            updateUser({
                name: existingUser.name, 
                newName: uname,
            })
        );
        setLoading(false)
        navigate('/');
    };

    return (
        <div className='d-flex w-60 vh-50 justify-content-center align-items-center mt-5'>
            <div className=' border bg-secondary text-white p-5'>
                <div className='create-btn border-bottom mb-3'>
                    <button onClick={() => {setActiveTab('todos')}} className={`mb-3 ${activeTab === 'todos' ? 'active-btn' : 'normal-btn' }`}>Todo</button>
                    <button onClick={() => {setActiveTab('users')}} className={`mb-3 ${activeTab === 'users' ? 'active-btn' : 'normal-btn' }`}>User</button>
                </div>
                
                <Spin spinning={loading}>
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
                </Spin>
                
            </div>
        </div>
    );
}

export default Update;
