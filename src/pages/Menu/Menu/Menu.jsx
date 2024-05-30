import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import Items from '../Items/Items';
import Cart from '../../../components/Cart/Cart';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useOrder from '../../../hooks/useOrder';

const Menu = () => {
    const [menu, todayMenu, loading] = useMenu();
    const [selectedItems, setSelectedItems] = useState([]);
    const { user } = useContext(AuthContext);
    const [totalOrder] = useOrder();

    // Check if the user has already ordered for the current date
    const hasOrderedToday = totalOrder.some(order => {
        const orderDate = new Date(order.date).toLocaleDateString();
        const currentDate = new Date().toLocaleDateString();
        return orderDate === currentDate && order.email === user?.email;
    });

    // Function to handle checkbox change
    const handleCheckboxChange = (optionId) => {
        // Add or remove the selected item
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(optionId)) {
                return prevSelectedItems.filter(id => id !== optionId);
            } else {
                return [...prevSelectedItems, optionId];
            }
        });
    };

    // Function to handle order confirmation
    const handleConfirm = () => {
        console.log(selectedItems);
        const currentDate = new Date(todayMenu.date).toLocaleDateString();
        const orderItem = { date: currentDate, email: user.email, name: user.displayName, ordered: selectedItems };

        if (user && user.email) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, confirm order!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Proceed to store the data in the database
                    fetch('https://office-lunch-menu-management-server.vercel.app/order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(orderItem)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire({
                                    title: "Order placed!",
                                    text: "Your order has been recorded.",
                                    icon: "success"
                                }).then(() => {
                                    
                                    window.location.reload();
                                });
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text: "There was an issue with your order. Please try again.",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error placing order:', error);
                            Swal.fire({
                                title: 'Error',
                                text: 'There was an error placing your order. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        });
                }
            });
        } else {
            Swal.fire({
                title: 'You must login to order.',
                text: 'Please login to place your order.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
         // Reload the page after order confirmation
         
    };

    // If loading, display a loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render the menu
    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>Office Lunch | Menu</title>
            </Helmet>
            
            <h2 className='text-center text-xl my-4 font-semibold'>Today's menu: ({new Date(todayMenu.date).toLocaleDateString()})</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {todayMenu && todayMenu.options.map(option => (
                        <Items
                            key={option.option_id}
                            option={option}
                            handleCheckboxChange={handleCheckboxChange}
                            isSelected={selectedItems.includes(option.option_id)}
                        />
                    ))}
                </tbody>
            </table>
            <div className='m-8 border-2 rounded-md'>
                <h3 className='text-center mt-4'>Selected Items:</h3>
                {selectedItems.length === 0 ? (
                    <p className='text-center mt-4'>Select your food!</p>
                ) : (
                    <div className='grid gap-4 grid-cols-3 mt-8 mx-8 py-8 border-4 rounded-lg'>
                        {selectedItems.map(id => (
                            // Cart is in components folder
                            <Cart
                                key={id}
                                todayMenu={todayMenu}
                                id={id}
                            />
                        ))}
                    </div>
                )}
                <div className='flex justify-center'>
                    {/* Conditionally render either the confirm button or the message */}
                    {hasOrderedToday ? (
                        <p className="my-4 text-red-500 font-semibold">You have already ordered for today.</p>
                    ) : (
                        <button onClick={handleConfirm}
                            className={`my-4 btn btn-outline btn-accent btn-sm ${selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={selectedItems.length === 0}>Confirm</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
