import React, { useState } from 'react';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';
import Logo from '../../assets/logo.jpg'
import Cart from '../../assets/cart.jpg'
import item_1 from '../../assets/item-1.jpg'
import item_2 from '../../assets/item-2.jpg'
import item_3 from '../../assets/item-3.jpg'
import item_4 from '../../assets/item-4.jpg'
import item_5 from '../../assets/item-5.jpg'
import item_6 from '../../assets/item-6.jpg'
import item_7 from '../../assets/item-7.jpg'
const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [cartItems, setCartItems] = useState([
    { img: item_1, name: 'Item 1', price: 29.99 },
    { img: item_2, name: 'Item 2', price: 19.99 },
    { img: item_3, name: 'Item 3', price: 9.99 },
    { img: item_4, name: 'Item 4', price: 29.99 },
    { img: item_5, name: 'Item 5', price: 39.99 },
    { img: item_6, name: 'Item 6', price: 59.99 },
    { img: item_7, name: 'Item 7', price: 89.99 },
    { img: item_1, name: 'Item 1', price: 29.99 },
    { img: item_2, name: 'Item 2', price: 19.99 },
    { img: item_3, name: 'Item 3', price: 9.99 },
    { img: item_4, name: 'Item 4', price: 29.99 },
    { img: item_5, name: 'Item 5', price: 39.99 },
    { img: item_6, name: 'Item 6', price: 59.99 },
    { img: item_7, name: 'Item 7', price: 89.99 },


  ]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const removeItemFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="navbar">
        {/* First row: Logo, Search Bar, User Profile, Cart */}
        <div className="navbar-row">
          <div className="logo"><img src={Logo} alt="" /></div>

          <input type="text" autoComplete="off" name="text" className="input" placeholder="Search your thoughts" />
          <div className="user-profile">
            <span className="user-name">UserName</span>
          </div>
          <label className="ui-switch">
            <input type="checkbox" />
            <div className="slider">
              <div className="circle"></div>
            </div>
          </label>

          <div className="cart" onClick={toggleSidebar}>
            {/* <span>Cart</span> */}
            <img src={Cart} alt="" />
          </div>
        </div>

        {/* Second row: Menu options */}
        <div className="menu-row">
          <div className="menu-item">Sell</div>
          <div className="menu-item">Bestsellers</div>
          <div className="menu-item">Today's Deals</div>
          <div className="menu-item">Mobiles</div>
          <div className="menu-item">Electronics</div>
          <div className="menu-item">Fashion</div>
          <div className="menu-item">New Releases</div>
          <div className="menu-item">Home & Kitchen</div>
          <div className="menu-item">Computers</div>
          <div className="menu-item">Books</div>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isVisible={isSidebarVisible}
        items={cartItems}
        onRemoveItem={removeItemFromCart}
        onClose={closeSidebar}
      />
    </div>
  );
};

export default Navbar;
