import { useEffect, useState } from "react";
import moment from 'moment-timezone';

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [todayMenu, setTodayMenu] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);

               // Get the current date in Bangladesh time
               const today = moment.tz('Asia/Dhaka').format('YYYY-MM-DD');

               // Find today's menu
               const todayMenu = data.find(menuItem =>
                   moment(menuItem.date).tz('Asia/Dhaka').format('YYYY-MM-DD') === today
               );

                setTodayMenu(todayMenu || null);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
            });
    }, []);

    return [ menu, todayMenu, loading ];


};

export default useMenu;