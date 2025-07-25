import React from 'react';

const ButtonComponent = ({
    background = '#007bff',
    description = 'Click Me',
    clickHandler,
    popup = '',
}) => (
    <div style={{ display: 'inline-block', position: 'relative' }}>
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
            onMouseEnter={e => {
                if (popup) {
                    const tooltip = document.createElement('div');
                    tooltip.textContent = popup;
                    tooltip.style.position = 'absolute';
                    tooltip.style.top = '110%';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                    tooltip.style.background = '#333';
                    tooltip.style.color = '#fff';
                    tooltip.style.padding = '6px 12px';
                    tooltip.style.borderRadius = '4px';
                    tooltip.style.whiteSpace = 'nowrap';
                    tooltip.style.zIndex = 9999;
                    tooltip.className = 'custom-tooltip';

                    // Detecta se o botão está próximo do final do container
                    const buttonRect = e.currentTarget.getBoundingClientRect();
                    const container = e.currentTarget.closest('.salas-table-container');
                    const containerRect = container ? container.getBoundingClientRect() : null;

                    if (containerRect && (buttonRect.bottom + 40 > containerRect.bottom)) {
                        // Mostra o tooltip acima do botão
                        tooltip.style.top = 'auto';
                        tooltip.style.bottom = '110%';
                    } else {
                        // Mostra o tooltip abaixo do botão
                        tooltip.style.top = '110%';
                        tooltip.style.bottom = 'auto';
                    }

                    e.currentTarget.parentNode.appendChild(tooltip);
                }
            }}
            onMouseLeave={e => {
                const tooltip = e.currentTarget.parentNode.querySelector('.custom-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            }}
        >
            {description}
        </button>
    </div>
);

export default ButtonComponent;
