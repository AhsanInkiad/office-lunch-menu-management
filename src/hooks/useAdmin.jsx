import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useContext(AuthContext);

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            if (!user?.email) return false; // Handle case when user is not logged in
            const res = await fetch(`http://localhost:5000/user/admin/${user.email}`);
            const data = await res.json();
            return data.admin;
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
