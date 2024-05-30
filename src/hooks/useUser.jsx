import React, { useEffect, useState } from 'react';

const useUser = () => {

       const [totalUser, setTotalUser] = useState([]);

    useEffect(() => {
        fetch('https://office-lunch-menu-management-server.vercel.app/user')
            .then(res => res.json())
            .then(data => {
                setTotalUser(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    return [totalUser];
};



export default useUser;