import React from 'react';
import { Helmet } from 'react-helmet-async';
import useOrder from '../../../hooks/useOrder';
import useMenu from '../../../hooks/useMenu';
import useUser from '../../../hooks/useUser';

const Home = () => {
    const isAdmin = true;
    const [totalOrder] = useOrder();
    const [menu, todayMenu, loading] = useMenu();
    const [totalUser] = useUser();
 
  
    // Get today's date in the same format as stored in totalOrder
    const currentDate = new Date().toLocaleDateString();

    // Filter totalOrder to include only today's orders
    const todayOrders = totalOrder.filter(order => order.date === currentDate);

    // Function to get the name of the food item from its ID
    const getFoodNameById = (id) => {
        if (!todayMenu || !todayMenu.options) {
            return '';
        }
        const foodItem = todayMenu.options.find(option => option.option_id === id);
        return foodItem ? foodItem.option_text : '';
    };
    

    return (
        <div>
            <Helmet>
                <title>Office Lunch | Home</title>
            </Helmet>
            {isAdmin ? (
                <>
                    <p>Is admin</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Selected Food</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayOrders.map((order, index) => (
                                    <tr key={order._id}>
                                        <th>{index + 1}</th>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>
                                            {order.ordered.sort((a, b) => a - b).map(id => getFoodNameById(id)).join(', ')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>Not Admin</>
            )}
            <h2>This is home. <br /> Total order : {totalOrder.length} <br /> Total users : {totalUser.length}</h2>
        </div>
    );
};

export default Home;
