import React, { useEffect, useState } from 'react';

const useOrder = () => {
    const [totalOrder, setTotalOrder] = useState([]);

    useEffect(() => {
        fetch('https://office-lunch-menu-management-server.vercel.app/order')
            .then(res => res.json())
            .then(data => {
                setTotalOrder(data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    return [totalOrder];
};

export default useOrder;