import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';
import Logo from '../../assets/logo.jpg';
import Cart from '../../assets/cart.jpg';
import item_1 from '../../assets/item-1.jpg';
import item_2 from '../../assets/item-2.jpg';
import item_3 from '../../assets/item-3.jpg';
import item_4 from '../../assets/item-4.jpg';
import item_5 from '../../assets/item-5.jpg';
import item_6 from '../../assets/item-6.jpg';
import item_7 from '../../assets/item-7.jpg';
import fashion1 from './../../assets/fashion1.jpg';
import fashion2 from './../../assets/fashion2.jpg';
import home1 from '../../assets/home1.jpg';
import home2 from '../../assets/home2.jpg';
import phone1 from '../../assets/phone1.jpg';
import phone2 from '../../assets/phone2.jpg';
import computer1 from '../../assets/computer1.jpg';
import computer2 from '../../assets/computer2.jpg';
import book2 from '../../assets/book2.jpg';

const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [allItems, setAllItems] = useState([
    { img: item_1, name: 'Holy Book', price: 29.99, category: 'Books' },
    { img: book2, name: 'History Book', price: 59.99, category: 'Books' },
    { img: item_2, name: 'Item 2', price: 19.99, category: 'Electronics' },
    { img: item_3, name: 'Item 3', price: 9.99, category: 'New Releases' },
    { img: item_4, name: 'Toys', price: 29.99, category: 'Today\'s Deals' },
    { img: item_5, name: 'Samsung Galaxy J2', price: 39.99, category: 'Mobiles' },
    { img: phone1, name: 'Nothing ', price: 39.99, category: 'Mobiles' },
    { img: phone2, name: 'Advance', price: 39.99, category: 'Mobiles' },
    { img: item_6, name: 'Bags', price: 59.99, category: 'Today\'s Deals' },
    { img: item_7, name: 'Item 7', price: 89.99, category: 'New Releases' },
    { img: home1, name: 'Fridge', price: 999.99, category: 'Home & Kitchen' },
    { img: home2, name: 'Utensils', price: 99.99, category: 'Home & Kitchen' },
    { img: computer1, name: 'Mac M2', price: 9999.99, category: 'Computers' },
    { img: computer2, name: 'Mac M3 MAX', price: 99999.99, category: 'Computers' },
    { img: fashion1, name: 'H&M', price: 999.99, category: 'Fashion' },
    { img: fashion2, name: 'Azio', price: 599.99, category: 'Fashion' },
  ]);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);

    const savedCategory = localStorage.getItem('selectedCategory') || 'All';
    setSelectedCategory(savedCategory);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const removeItemFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  const filteredItems = selectedCategory === 'All'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    // Add item to cart (avoid duplicates)
    if (!cartItems.find(cartItem => cartItem.name === item.name)) {
      setCartItems([...cartItems, item]);
    }
  };

  return (
    <div>
      <div className="navbar">
        {/* First row: Logo, Search Bar, User Profile, Cart */}
        <div className="navbar-row">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <input
            type="text"
            autoComplete="off"
            name="text"
            className="input"
            placeholder="Search your thoughts"
          />
          <div className="user-profile">
            <span className="user-name">UserName</span>
          </div>
          <label className="ui-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="slider">
              <div className="circle"></div>
            </div>
          </label>
          <div className="cart" onClick={toggleSidebar}>
            <img src={Cart} alt="Cart" />
          </div>
        </div>

        {/* Second row: Menu options */}
        <div className="menu-row">
          {['All', 'Sell', 'Bestsellers', 'Today\'s Deals', 'Mobiles', 'Electronics', 'Fashion', 'New Releases', 'Home & Kitchen', 'Computers', 'Books'].map((category) => (
            <div
              key={category}
              className={`menu-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Items Display Section */}
      <div className="items-display">
        {filteredItems.length === 0 ? (
          <p>No items available in this category.</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index} className="item-card">
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
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
