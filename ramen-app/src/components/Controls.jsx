import { useState } from 'react';
import './Controls.css';

const Controls = (props) => {
  const { limit, setLimit } = props;
  const [selectValue, setSelectValue] = useState(limit);

  const handleSelect = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectValue(value);
    setLimit(value);
  };

  return (
    <div className="controls">
      <p>Reviews to display: {limit}</p>

      <select value={selectValue} onChange={handleSelect}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default Controls;