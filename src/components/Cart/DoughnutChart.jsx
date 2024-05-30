import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ todayOrders, totalUser }) => {
    const data = {
        labels: [`Orders Today: ${todayOrders.length} `, `Did not order: ${totalUser.length - todayOrders.length}`],
        datasets: [
            {
                data: [todayOrders.length, totalUser.length - todayOrders.length],
                backgroundColor: [

                    '#0FADCF',
                    '#8FD0EF',
                ],
                hoverOffset: 5,
            },
        ],
    };

    return (<div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Doughnut data={data} />;
    </div>)
};

export default DoughnutChart;
