import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';


const Nav = () => {
    const {user, logOut} = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
        .then(()=>{})
        .catch(error=>console.log(error));
    }
    return (
        <div>
            <div className="navbar bg-base-100 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/menu'>Menu</Link></li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">Office Lunch</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/menu'>Menu</Link></li>
                        <li><Link to='/addmenu'>Add Menu</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    
                    {
                        user ? <>
                        <button onClick={handleLogOut} className="btn btn-ghost">Logout</button>
                        </> : <>
                        <Link to='/login' className="btn">Login</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Nav;