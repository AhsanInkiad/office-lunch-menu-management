import React from 'react';

const Cart = ({ todayMenu, id }) => {
    const option = todayMenu.options.find(opt => opt.option_id === id);
   
    return (
        <div className='flex flex-col justify-center items-center'>
            {option.option_text}
            <div className="mask mask-squircle w-24 h-24 mt-4">
                <img className="w-full h-full object-cover" src={option.image} alt="" />
            </div>
        </div>
    );
};

export default Cart;