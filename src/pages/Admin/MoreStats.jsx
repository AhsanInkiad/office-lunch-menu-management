import React from 'react';
import useOrder from '../../hooks/useOrder';
import useMenu from '../../hooks/useMenu';

const MoreStats = () => {
    const [totalOrder] = useOrder();
    const [menu, todayMenu] = useMenu();

    // Get today's date in the same format as stored in totalOrder
    const currentDate = new Date().toLocaleDateString();

    // Filter totalOrder to include only today's orders
    const todayOrders = totalOrder.filter(order => order.date === currentDate);


    // Calculate the total number of each item ordered
    const itemCounts = todayOrders.reduce((counts, order) => {
        order.ordered.forEach(option_id => {
            counts[option_id] = (counts[option_id] || 0) + 1;
        });
        return counts;
    }, {});



    return (
        <div>
            <h2 className='text-center text-xl font-semibold mt-16'>Total of individual item ordered today ({currentDate}): </h2>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded-xl p-12">
                {todayMenu?.options?.map(option => (
                    <div key={option.option_id} className="flex justify-center">
                        <div className="card w-96 bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">{option.option_text}</h2>
                                <div className="card-actions justify-end">
                                    <button className="btn">Total ordered: {itemCounts[option.option_id] || 0}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreStats;
