import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../redux/UserReducer';
import { addTodo } from '../redux/TodoReducer';
import { useNavigate } from 'react-router-dom';


const Create = () => {

    const [activeTab, setActiveTab] = useState('todos');
    const [name,setName] = useState('')

    // const users = useSelector((state) => state.users)
    // const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const todoSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo({name}))
        navigate('/')
    }

    const userSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser({name}))
        navigate('/')
    }

    return (
        <div className='d-flex  vh-50 justify-content-center align-item-center mt-5'>
            <div className='w-90 border bg-secondary text-white p-5'>
                <div className='create-btn border-bottom mb-3'>
                    <button onClick={() => {setActiveTab('todos')}} className={`mb-3 ${activeTab === 'todos' ? 'active-btn' : 'normal-btn' }`}>Todo</button>
                    <button onClick={() => {setActiveTab('users')}} className={`mb-3 ${activeTab === 'users' ? 'active-btn' : 'normal-btn' }`}>User</button>
                </div>

                {activeTab === 'todos' ?
                <div>
                    <h3 className='text_color'>Add New ToDo</h3>
                    <form onSubmit={todoSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' required className='form-control form-signin' placeholder='Enter name' onChange={e=>setName(e.target.value)} />
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
                :
                <div>
                    <h3 className='text_color'>Add New User</h3>
                    <form onSubmit={userSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' name='name' required className='form-control form-signin' placeholder='Enter name' onChange={e=>setName(e.target.value)} />
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
                }
            </div>
        </div>
    )
}

export default Create