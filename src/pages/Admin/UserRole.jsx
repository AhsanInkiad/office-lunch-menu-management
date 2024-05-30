
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';

const UserRole = () => {
    const { data: user = [], refetch } = useQuery({
        queryKey: 'user',
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/user');
            return res.json();
        }
    });

    

    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/user/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now an Admin!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }

    return (
        <div>
            Total User: {user.length}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? 'admin' :
                                    <button onClick={()=> handleMakeAdmin(user)} className='btn  btn-outline btn-info'> Make Admin</button>}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserRole;