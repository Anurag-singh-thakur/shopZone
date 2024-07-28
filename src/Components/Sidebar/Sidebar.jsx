import React, { useRef, useEffect } from 'react';
import './Sidebar.css'; 

const Sidebar = ({ isVisible, items, onRemoveItem, onClose }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <h2>Cart Items</h2>
      </div>
      <div className="sidebar-content">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.img} alt={item.name} className="item-img" />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <div className="item-price">
                  ${item.price}
                  <button className="remove-btn" onClick={() => onRemoveItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
