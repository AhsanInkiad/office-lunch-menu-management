import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Nav from '../pages/Shared/Nav/Nav';

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            {/* {noHeaderFooter || <Nav></Nav>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>} */}
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;