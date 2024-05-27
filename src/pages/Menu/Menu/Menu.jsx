import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import Items from '../Items/Items';

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
            <div>
                <h3>Selected Items:</h3>
                <ul>
                    {selectedItems.map(id => {
                        const option = todayMenu.options.find(opt => opt.option_id === id);
                        return <li key={id}>{option.option_text}</li>;
                    })}
                </ul>
                <button className='btn btn-outline btn-accent btn-sm'>Confirm</button>
            </div>
        </div>
    );
};

export default Menu;
