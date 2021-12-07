import React from 'react';

const AddMinBtn = ({ value, minBtn, addBtn }) => {
  return (
    <div className="count flex mt-5 gap-2 items-center">
      <button
        className="px-2 grid place-content-center h-6 border border-black rounded cursor-pointer hover:bg-black duration-300 transition-all hover:text-white"
        onClick={minBtn}
      >
        -
      </button>
      <span className="text-2xl leading-normal px-2">{value}</span>
      <button
        className="px-2 grid place-content-center h-6 border border-black rounded cursor-pointer hover:bg-black duration-300 transition-all hover:text-white"
        onClick={addBtn}
      >
        +
      </button>
    </div>
  );
};

export default AddMinBtn;
