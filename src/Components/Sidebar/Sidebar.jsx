import React, { useRef, useEffect } from 'react';
import './Sidebar.css'; 
import '../Navbar/Navbar.css'; 

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

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const totalPrice = calculateTotalPrice();
  const deliveryCharges = totalPrice > 5 ? 2 : 0;
  const grandTotal = (totalPrice + deliveryCharges).toFixed(2);

  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <h2>Cart Items</h2>
        <button className="close-btn" onClick={onClose}>Close</button>
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
                  ${item.price.toFixed(2)}
                  <button className="remove-btn" onClick={() => onRemoveItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bill-counter">
        <div className="bill-summary">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        {deliveryCharges > 0 && (
          <div className="bill-summary">
           <p>Delivery:</p>
            <p>${deliveryCharges.toFixed(2)}</p>
          </div>
        )}
        <div className="bill-summary">
          <h3>Total:</h3>
          <h3>${grandTotal}</h3>
        </div>
        {totalPrice > 0 && (
          <button className="checkout-btn">Proceed to Checkout</button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
