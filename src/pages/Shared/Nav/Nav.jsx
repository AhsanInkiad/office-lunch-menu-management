import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';

const Nav = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    console.log("isAdmin=", isAdmin);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    return (
        <div className="bg-gray-800 text-white">
            <div className="navbar container mx-auto p-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-gray-800 rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>
                            {!isAdmin ? <li><Link to='/menu'>Menu</Link></li> : null}
                            {isAdmin ? <li><Link to='/addmenu'>Add Daily Menu</Link></li> : null}
                            {isAdmin ? <li><Link to='/userrole'>User Role</Link></li> : null}
                        </ul>
                    </div>
                    <Link to='/' className="text-xl font-bold">Office Lunch</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold">
                        <li><Link to='/'>Home</Link></li>
                        {!isAdmin ? <li><Link to='/menu'>Menu</Link></li> : null}
                        {isAdmin ? <li><Link to='/addmenu'>Add Daily Menu</Link></li> : null}
                        {isAdmin ? <li><Link to='/userrole'>User Role</Link></li> : null}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="indicator">
                                {isAdmin ? <span className="indicator-item indicator-center badge badge-success">Admin</span>:
                                <span ></span>}
                                
                                    <p className="pt-2 font-semibold text-lg">{user.displayName}</p>
                                </div>
                               
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                            <button onClick={handleLogOut} className="btn btn-outline btn-error">Logout</button>
                        </div>
                    ) : (
                        <Link to='/login' className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nav;
