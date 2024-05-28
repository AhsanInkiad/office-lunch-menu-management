const Items = ({ option, handleCheckboxChange, isSelected }) => {
    return (
        <tr>
            <td>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(option.option_id)}
                    />
                </label>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-24 h-24">
                            <img  className="transition-transform duration-300 transform hover:scale-110" src={option.image} alt={option.option_text} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{option.option_text}</div>
                    </div>
                </div>
            </td>
            <td>{option.ingredients.join(', ')}</td>
        </tr>
    );
};

export default Items;
