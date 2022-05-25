import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"

const Footer = () => {
  return (
    <footer>
        <div className="footer__brand">
          <img
            className="futo_logo"
            src="/images/FUTO_logo_main.png"
            alt="FUTO logo"
          />
          <h3>Federal Uninversity of Technology, Owerri</h3>
        </div>
        <div className='footer__links'>
          <Link to="/">Home</Link>
          <a href="#about__app">About App</a>
          <a href="#solutions_offered">Solutions Offered</a>
        </div>
        <div className='footer__links'>
      
          <Link to="/signin">Login</Link>
          <Link to="/signin-admin">Login in Admin</Link>
        </div>
      </footer>
  )
}

export default Footer