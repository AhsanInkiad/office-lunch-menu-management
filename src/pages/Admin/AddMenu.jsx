import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useMenu from '../../hooks/useMenu';

const AddMenu = () => {
    const [date, setDate] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [options, setOptions] = useState([
        { option_id: '1', option_text: '', ingredients: '', image: '' }
    ]);

    const [menu] = useMenu();

    const handleOptionChange = (index, event) => {
        const updatedOptions = [...options];
        updatedOptions[index][event.target.name] = event.target.value;
        setOptions(updatedOptions);
    };

    const addOption = () => {
        const newOptionId = (options.length + 1).toString();
        setOptions([...options, { option_id: newOptionId, option_text: '', ingredients: '', image: '' }]);
    };

    const removeOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        // Reassign option IDs after removing an option
        const reassignedOptions = updatedOptions.map((option, i) => ({
            ...option,
            option_id: (i + 1).toString()
        }));
        setOptions(reassignedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const addMenu = {
            date,
            created_by: createdBy,
            options: options.map(option => ({
                ...option,
                ingredients: option.ingredients.split(',').map(ing => ing.trim())
            }))
        };

        const existingMenu = menu.find(m => new Date(m.date).toLocaleDateString() === new Date(date).toLocaleDateString());
        
        if (existingMenu) {
            Swal.fire({
                title: "Menu already exists!",
                text: "A menu for the selected date already exists. Please choose a different date.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm menu!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('https://office-lunch-menu-management-server.vercel.app/menu', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addMenu)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            title: "Menu added!",
                            text: "Your menu has been recorded.",
                            icon: "success"
                        }).then(() => {
                                    
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "There was an issue with adding the menu. Please try again.",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                })
                .catch(error => {
                    console.error('Error adding menu:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'There was an error adding your menu. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            }
        });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <div className="my-10 max-w-4xl mx-auto p-6 bg-gray-800 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Add New Menu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                        <label className="block text-white">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={today}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Created By:</label>
                        <input
                            type="text"
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    {options.map((option, index) => (
                        // Options div
                        <div key={index} className="border-2 rounded-xl p-8 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-2">Option {index + 1}</h3>
                            <label className="block text-white">Option ID:</label>
                            <input
                                type="text"
                                name="option_id"
                                value={option.option_id}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
                            />
                            <label className="block text-white">Option Text (Food Name):</label>
                            <input
                                type="text"
                                name="option_text"
                                value={option.option_text}
                                onChange={(e) => handleOptionChange(index, e)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
                            />
                            <label className="block text-white">Ingredients (comma separated):</label>
                            <input
                                type="text"
                                name="ingredients"
                                value={option.ingredients}
                                onChange={(e) => handleOptionChange(index, e)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
                            />
                            <label className="block text-white">Food Image URL:</label>
                            <input
                                type="text"
                                name="image"
                                value={option.image}
                                onChange={(e) => handleOptionChange(index, e)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
                            />
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                            >
                                Remove Option
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={addOption} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
                            Add Another Option
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                            Submit Menu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;
