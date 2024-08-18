import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../redux/UserReducer'; 
const Home = () => {
    const users = useSelector((state) => state.users);
    console.log(users)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        console.log(id)
        dispatch(deleteUser(id)); 
        navigate(0); 
    }

    return (
        <div className='container' style={{ marginTop: '2rem' }}>
            <h2 className='mb-5'>Simple Crud App With Redux</h2>
            <Link to="/create" className='btn btn-primary my-3 p-3 '>Create +</Link>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                <button 
                                    onClick={() => handleDelete(user.id)} 
                                    className='btn btn-sm btn-danger ms-2'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
