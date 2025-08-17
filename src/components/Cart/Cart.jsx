import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(storedCart);
  }, []);

  const updateLocalStorage = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const incrementQty = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updated);
  };

  const decrementQty = (id) => {
    const updated = items
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateLocalStorage(updated);
  };
  const onPayment = () => {
    navigate('/payment')
    localStorage.removeItem('cart');
  }
  const total = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  return (
    <div>
      <div className='cart-header'>
        <Navbar />
      </div>
      <div>
        {items.length === 0 ? (
          <div className='empty-cart'>
            <img src="/images/image copy.png" />
            <h3>Your Cart is Empty</h3>
            <button className='cart-back' onClick={() => navigate(-1)}>Back</button>
          </div>
        ) : (
          <>
          <div className="cart-container">
            <div className='cart-title'>
                <h2>Your Cart</h2>
                <button className='cart-back' onClick={() => navigate(-1)}>Back</button>
            </div>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>₹ {item.cost}</p>
                  <div className="qty-controls">
                    <button onClick={() => decrementQty(item.id)} >-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQty(item.id)} >+</button>
                  </div>
                </div>
                <p className="item-total">₹ {item.cost * item.quantity}</p>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ₹{total}</h3>
              <button className="checkout-btn" onClick={onPayment}>Payment</button>
            </div>
            </div>
          </>
        )}
      </div>
      </div>
  );
};

export default Cart;
