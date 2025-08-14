import React from 'react'
import './home.css'
import Navbar from '../Navbar/Navbar'
import ReactSlick from '../Carousel/index.jsx'
import Restaurants from '../PopularSection/Restaurants.jsx'
const Home = () => {
    
  return (
    <div>
      <Navbar />
      <div className='home-container'>
        <h1>Restaurant Offers</h1>
        <ReactSlick />
        <Restaurants />
      </div>
    </div>
  )
}

export default Home
