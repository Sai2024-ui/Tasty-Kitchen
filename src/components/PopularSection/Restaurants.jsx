import React, { useEffect, useState } from "react";
import "./Restaurants.css";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";

const LIMIT = 12;

export default function PopularRestaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [sortOption, setSortOption] = useState("Highest");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const jwtToken = Cookies.get('jwt_token');
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortOption}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch restaurants. Status:", response.status);
          setRestaurants([]);
          return;
        }

        const data = await response.json();
        setRestaurants(data.restaurants || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [offset, sortOption]); 

  const handleNext = () => {
    setOffset(prev => Math.min(prev + LIMIT, 23));
    setCount(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setOffset(prev => Math.max(prev - LIMIT, 0));
    setCount(prev => Math.max(prev - 1, 1));
  };

  const onHandleClick = (restaurantId) => () => {
    console.log('restaurantId from params:', restaurantId);
    navigate(`/restaurant/${restaurantId}`)
  }

  return (
    <div className="restaurants-container">
      <br />
      <div className="header-container">
        <div>
          <h1 className="title">Popular Restaurants</h1>
          <p className="paragraph">Select your favourite dish and make your day beautiful.</p>
        </div>

        <div className="sort-container">
          <label htmlFor="sort" className="sort-label">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value="Highest">Highest</option>
            <option value="Lowest">Lowest</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card" onClick={onHandleClick(restaurant.id)}>
              <img
                src={restaurant.image_url}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-cuisine">{restaurant.cuisine}</p>
              <p className="restaurant-rating">
                ⭐ {restaurant.user_rating?.rating ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePrev} disabled={offset === 0}>
          -
        </button>
          <span className="count-display">{count}</span>
        <button className="Up" onClick={handleNext} disabled={count === 3}>
          +
        </button>
      </div>
    </div>
  );
}
