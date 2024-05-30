import React, { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import useOrder from '../../../hooks/useOrder';
import useMenu from '../../../hooks/useMenu';
import useUser from '../../../hooks/useUser';
import { AuthContext } from '../../../providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import DoughnutChart from '../../../components/Cart/DoughnutChart';
import { Link } from 'react-router-dom';

const Home = () => {
    const [totalOrder] = useOrder();
    const [menu, todayMenu, loading] = useMenu();
    const [totalUser] = useUser();
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

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

    // Extract and format distinct dates from the menu data
    const menuDates = useMemo(() => {
        return menu.reduce((dates, item) => {
            const date = item.date.split('T')[0];
            if (!dates.includes(date)) {
                dates.push(date);
            }
            return dates;
        }, []).sort((a, b) => new Date(a) - new Date(b));
    }, [menu]);

    // Generate range of dates between the earliest and latest menu date
    const getDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateArray = [];
        let currentDate = start;
        while (currentDate <= end) {
            dateArray.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    };

    // Get the full range of dates
    const fullDateRange = useMemo(() => {
        if (menuDates.length === 0) return [];
        return getDateRange(menuDates[0], menuDates[menuDates.length - 1]);
    }, [menuDates]);

    return (
        <div>
            <Helmet>
                <title>Office Lunch | Home</title>
            </Helmet>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl  text-center font-bold mt-12 mb-4">Welcome, {user ? user.displayName : 'Guest'}!</h1>
                <p className="mb- text-center text-2xl  font-bold">Today's Date: {currentDate}</p>
                
                
                {/* If Admin */}
                {isAdmin ? (<>
                    <div className="mt-8 overflow-x-auto mb-12 border rounded-lg p-16">
                        <h3 className="text-lg font-bold mb-6  text-center md:text-2xl">Employee Choice Record: ({currentDate})</h3>
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Selected Food</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayOrders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
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
                    <div className="my-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Total User */}
                        <div className='flex justify-center'>
                            <div className=" card w-full md:w-96 bg-primary text-primary-content h-96">
                                <div className="card-body ">
                                    <h2 className="text-xl font-bold text-white text-center">Total user: {totalUser.length}</h2>
                                    <DoughnutChart todayOrders={todayOrders} totalUser={totalUser} />
                                </div>
                            </div>
                        </div>
                        {/* Menu added per date */}
                        <div className='flex justify-center'>
                            <div className="card w-full md:w-96 bg-primary text-primary-content overflow-y-auto h-96">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold text-white text-center">Menu Added Dates</h2>
                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        {fullDateRange.map(date => (
                                            <div key={date} className="flex justify-between items-center bg-white p-2 rounded shadow">
                                                <span className='font-semibold'>{date}</span>
                                                <span className={menuDates.includes(date) ? "text-green-500" : "text-red-500"}>
                                                    {menuDates.includes(date) ? '✔' : <small className='text-xs'>Not Added</small>}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* More stats */}
                        <div className="flex justify-center">
                            <div className="card w-full md:w-96 bg-primary text-primary-content h-96">
                                <div className="card-body flex justify-center">
                                    <Link to='/morestats' className="btn  sm:btn-sm md:btn-md lg:btn-lg text-white md:text-2xl mx-8">More Stats</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </>) : <></>}

                {/* Today's Menu */}
                <div className="mb-8 mt-12">
                    <h2 className="text-xl text-center font-semibold mb-4">Today's Menu</h2>
                    <div className="border bg-gray-800 rounded-lg py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {todayMenu?.options?.map(option => (
                            <div key={option.option_id} className="flex justify-center">
                                <div className="card w-52 md:w-72 bg-base-100 shadow-xl flex flex-col items-center">
                                    <figure className="h-48 w-full overflow-hidden">
                                        <img src={option.image} alt={option.option_text} className="w-full h-full object-cover" />
                                    </figure>
                                    <div className="card-body flex flex-col items-center">
                                        <h2 className="card-title">{option.option_text}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* If Admin */}
                {isAdmin ? (
                    <>

                    </>
                ) : (
                    <>
                        <div className="my-10">
                            {!user ? <p>Login to order food!</p> : <p>Go to menu page to order food.</p>}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
