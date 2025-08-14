import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/Login', {replace: true})
        localStorage.remove('cart');
    }
    

  return (
    <div className="navbar">
        <div style={{display:"flex"}}>
            <Link to ="/">
            <img src="/images/image.png" alt="Logo" style={{height:"40px", marginTop:"7px"}}/>
            </Link>
            <h1 className="brand-name" style={{marginLeft:"8px"}}>Tasty Kitchens</h1>
        </div>
        <div className="navLinks">
            <div style={{display:"flex", gap:"20px",marginTop:"10px"}}>
                <Link to="/" className="navLink" style={{color:"orange"}}>Home</Link>
                <Link to="/Cart" className="navLink">Cart</Link>
            </div>
            <Link to="/Login" className="navLink"><button className='logout-button' onClick={onClickLogout}>Logout</button></Link>
        </div>
    </div>
  )
}

export default Navbar
