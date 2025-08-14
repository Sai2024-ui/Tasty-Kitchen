import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './RestaurantDetails.css';
import Navbar from '../Navbar/Navbar';
import Cart from '../Cart/Cart';

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [Data, setData] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      const Url = `https://apis.ccbp.in/restaurants-list/${restaurantId}`;
      const jwtToken = Cookies.get('jwt_token');
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      const response = await fetch(Url, options);
      const data = await response.json();
      setData(data.food_items);
    };
    fetchData();
  }, [restaurantId]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const updated = [...prevCart];
        updated[index].quantity += 1;
        return updated;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const incrementQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="Main">
        <div className="card-container">
          {Data.map((each) => {
            const inCart = cart.find((item) => item.id === each.id);
            return (
              <div key={each.id} className="card">
                <img src={each.image_url} alt={each.name} />
                <div className="Text">
                  <h3>{each.name}</h3>
                  <p>₹ {each.cost}</p>
                  <p>⭐ {each.rating}</p>
                  {inCart ? (
                    <div>
                      <button onClick={() => incrementQty(each.id)}>+</button>
                      <span className="quantity">{inCart.quantity}</span>
                      <button onClick={() => decrementQty(each.id)}>-</button>
                      <p>Item Added</p>
                    </div>
                  ) : (
                    <button className="Add" onClick={() => addToCart(each)}>
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Cart Component */}
        <div className='Cart'><Cart items={cart} /></div>
      </div>
      <footer></footer>
    </div>
  );
};

export default RestaurantDetails;
