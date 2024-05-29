import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import Items from '../Items/Items';
import Cart from '../../../components/Cart/Cart';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';

const Menu = () => {
    const [menu, todayMenu, loading] = useMenu();
    const [selectedItems, setSelectedItems] = useState([]);
    const { user } = useContext(AuthContext);

        console.log("today menu", todayMenu);
    // add item in cart via selectedItems and remove item from cart. 
    const handleCheckboxChange = (optionId) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(optionId)) {

                // If the option is already selected, remove it
                return prevSelectedItems.filter(id => id !== optionId);
            } else {

                // If the option is not selected, add it
                return [...prevSelectedItems, optionId];
            }

        });
    };

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
                    fetch('http://localhost:5000/order', {
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
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>Office Lunch | Menu</title>
            </Helmet>
            <h2>This is the menu page. Total menus: {menu.length}</h2>
            <h2>Today's menu: {new Date(todayMenu.date).toLocaleDateString()}</h2>

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
                    <button onClick={handleConfirm}
                        className={`my-4 btn btn-outline btn-accent btn-sm ${selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedItems.length === 0}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
