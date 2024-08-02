import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    console.log(users);
    const navigate = useNavigate()
    return (
        <div className='container' style={{marginTop:'10rem'}}>
            <h2>Crud App With JSON Server</h2>
            <Link to="/create" className='btn btn-success ny-3'>Create +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((users, index) => (
                        <tr key={index}>
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>
                                <Link to={`/edit/${users.id}`}  className='btn btn-sm btn-primary'>Edit</Link>
                                <Link onChange={() => handleDelet(user.id)} className='btn btn-sm btn-danger ms-2'>Delete</Link>
                            </td>
                        </tr>
                    ))}           
                </tbody>
            </table>
        </div>
    )
}

export default Home