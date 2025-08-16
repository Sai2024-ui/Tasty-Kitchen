import React from 'react'
import './Payment.css'

const Payment = () => {
    function onReturnHome() {
        window.location.href = '/';
    }
  return (
    <div className='Payment-Container'>
    <div className="checkout-bg">
      {/* <IoCheckmarkCircleOutline color="green" size={30} /> */}
      <img className="Image-dawn" src="https://imgs.search.brave.com/H0gz3ww9vKhP__9cIsTXuJSnBURDWjVpHtIPvf4iWQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzcyLzEyLzAz/LzM2MF9GXzE1NzIx/MjAzNjNfTFBZVk0x/VUNUM2tGUUN4UTY5/SE4ydzRLM24yUlRB/TzAuanBn" />
      <h1 className="checkout-head">Payment Successful</h1>
      <p className="thank-you">Thank you for ordering</p>
      <p className="thank-you">Your Payment is successfully completed.</p>
      <button className="btn-return" onClick={onReturnHome} type="button">
        Return to Homepage
      </button>
    </div>

    </div>
  )
}

export default Payment
