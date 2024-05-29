import React, { useEffect, useState } from 'react';

const useOrder = () => {
    const [totalOrder, setTotalOrder] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/order')
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