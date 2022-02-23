import React from 'react'
import { Link } from 'react-router-dom'

// Import this component specific stylesheet
import './Footer.css'

function Footer() {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>Download our app</h4>
        <ul>
          <li>
            <Link to='/' id='notdecided'>
              <span className='icon'>
                <ion-icon name='logo-google-playstore'></ion-icon>
              </span>
              <span className='title'>Google Play Store</span>
            </Link>
          </li>
          <li>
            <Link to='/' id='notdecided'>
              <span className='icon'>
                <ion-icon name='logo-apple-appstore'></ion-icon>
              </span>
              <span className='title'>Apple App Store</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='midFooter'>
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2022 &copy; deepakmane.com</p>
      </div>
      <div className='rightFooter'>
        <h4>Follow Us</h4>
        <ul>
          <li>
            <Link to='/' id='notdecided'>
              <span className='icon'>
                <ion-icon name='logo-linkedin'></ion-icon>
              </span>
            </Link>
          </li>
          <li>
            <Link to='/' id='notdecided'>
              <span className='icon'>
                <ion-icon name='logo-github'></ion-icon>
              </span>
            </Link>
          </li>
          <li>
            <Link to='/' id='notdecided'>
              <span className='icon'>
                <ion-icon name='logo-twitter'></ion-icon>
              </span>
            </Link>
          </li>
          <li>
            <Link to='/' id='notdecided'>
              <span className='icon'>
                <ion-icon name='logo-facebook'></ion-icon>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer