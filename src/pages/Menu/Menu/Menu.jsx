import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';

const Menu = () => {
    const [menu] = useMenu();
    return (
        <div>
            <Helmet>
                <title>Office Lunch | Menu</title>
            </Helmet>
            <h2>This is menu page. Total menu: {menu.length}</h2>
        </div>
    );
};

export default Menu;