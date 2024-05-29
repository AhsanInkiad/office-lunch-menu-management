import React from 'react';
import { Helmet } from 'react-helmet-async';
import useOrder from '../../../hooks/useOrder';

const Home = () => {
    const isAdmin = true;
    const [totalOrder] = useOrder();
    return (
        <div>
            <Helmet>
                <title>Office Lunch | Home</title>
            </Helmet>
           
            <h2>This is home. Total order: {totalOrder.length}</h2>
        </div>
    );
};

export default Home;