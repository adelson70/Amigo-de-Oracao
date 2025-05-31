import React from 'react';

const ButtonComponent = ({ background = '#007bff', description = 'Click Me', clickHandler }) => (
    <button
        style={{
            backgroundColor: background,
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        }}
        className="btn btn-primary"
        onClick={clickHandler}
    >
        {description}
    </button>
);

export default ButtonComponent;
