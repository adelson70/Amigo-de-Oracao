import React from 'react';
import './styles.css';

const ButtonHomeComponent = ({ description = 'Click Me', clickHandler }) => (
    <button
        className="button-home-component"
        onClick={clickHandler}
    >
        {description}
    </button>
);

export default ButtonHomeComponent;
