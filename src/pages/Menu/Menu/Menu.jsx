import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import Items from '../Items/Items';
import Cart from '../../../components/Cart/Cart';

const Menu = () => {
    const [menu, todayMenu, loading] = useMenu();
    const [selectedItems, setSelectedItems] = useState([]);

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
                            <Cart
                                key={id}
                                todayMenu={todayMenu}
                                id={id}
                            />
                        ))}
                    </div>
                )}
                <div className='flex justify-center'>
                    <button className='my-4 btn btn-outline btn-accent btn-sm'>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
