import React from 'react'

// Import this component specific stylesheet
import './Header.css'

function Header(params) {
  return (
    <div className='header topbar'>
      <div className='toggle'>
        <button
          className='btn-toggle'
          onClick={()=>{
            params.setShowSideBar(!params.showSideBar)
            params.setLogoImage(!params.logoImage)
          }}
        >
          <ion-icon name='menu-outline'></ion-icon>
        </button>
      </div>

      {/*   search   <SearchBar />*/}
      <div className='search'>
        <label>
          <input type='text' placeholder='Search here' />
          <ion-icon name='search-outline'></ion-icon>
        </label>
      </div>

      {/*   userImg   */}
      <div className='user'>
        <img src='images\user15-derivatives\user15-50_x_50.jpg' alt='profile' />
      </div>
    </div>
  )
}

export default Header
