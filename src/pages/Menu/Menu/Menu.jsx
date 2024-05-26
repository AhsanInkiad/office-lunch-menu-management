import React from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';

const Menu = () => {
    const [menu, todayMenu, loading] = useMenu();

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
                        <th>
                           
                        </th>
                        <th>Item</th>
                        <th>Ingredients</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {todayMenu && todayMenu.options.map(option => (
                        <tr key={option.option_id}>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-24 h-24">
                                            <img src={option.image} alt={option.option_text} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{option.option_text}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {option.ingredients.join(', ')}
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    );
};

export default Menu;
