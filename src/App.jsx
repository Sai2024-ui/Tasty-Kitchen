import React from 'react'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login/Login'
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Payment from './components/Payment/Payment'
import { useEffect } from 'react'

const App = () => {
  
  useEffect(()=>{
    localStorage.removeItem('cart');
    document.title="Tasty Kitchens"
    
  },[])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path='/Cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path='/payment' element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
