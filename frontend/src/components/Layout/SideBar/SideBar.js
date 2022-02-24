import React  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Import Images used in this component
import logo from './ECOMMERCE-LOGO.ico'
import logomini from './ECOMMERCE-LOGO-MINI.ico'

// Import this component specific stylesheet
import './SideBar.css'


function SideBar({ showSideBar , logoImage}) {
  const navigate = useNavigate()
  const location = useLocation()

  // Debugging if Toggle button is Opening/Closing SideBar uncomment
  // console.log('showSideBar value:', showSideBar)
  // console.log('logoImage value:', logoImage)


  const menuItems = [
    {
      title: '',
      path: '/LOGO',
      iconName: ' ',
    },    

    {
      title: 'Home',
      path: '/home',
      iconName: 'home-outline',
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      iconName: 'qr-code-outline',
    },
    {
      title: 'Customers',
      path: '/customers',
      iconName: 'people-outline',
    },
    {
      title: 'Message',
      path: '/message',
      iconName: 'chatbubble-outline',
    },
    {
      title: 'Help',
      path: '/help',
      iconName: 'help-outline',
    },
    {
      title: 'Settings',
      path: '/settings',
      iconName: 'settings-outline',
    },
    {
      title: 'Logout',
      path: '/logout',
      iconName: 'lock-closed-outline',
    },
  ]

  const logout = () => {
    localStorage.removeItem('dnews-user')
    navigate('/')
  }


  
  
  return (
    <div className={`sidebar-container ${showSideBar ? ' open': ''}`}>
      <div>
        <img src={ logoImage ? logo: logomini  } className={`App-logo${showSideBar ? ' ' : ' mini'}`} alt='logo'/>
      </div>

    {/* <div className={`logo${showSideBar ? '' : ' mini'}`}>
          Add Logo Class here and Logo image in CSS file*
          <span></span>
    </div>/}

      
      {/* Add menuItems in above variable to be displayed inside Sidebar unde Logo*/}   
      <div className={`navigation${showSideBar ? ' open' : ''}`}   >
        <ul>
          {menuItems.map(item => {
            return item.title !== 'Logout' ? (
              <li key={item.title}>
                <Link
                  to={`${item.path}`}
                  className={`nav-link${location.pathname.includes(item.path) ? ' active' : ''}`}
                  
                >
                  <span className='icon'>
                    <ion-icon name={`${item.iconName}`}></ion-icon>
                  </span>
                  <span className='title'>{item.title}</span>
                </Link>
              </li>
            ) : (
              <li key={item.title}>
                <Link
                  to={`${item.path}`}
                  className={`nav-link${location.pathname.includes(item.path) ? ' active' : ''}`}
                  
                >
                  <span className='icon'>
                    <ion-icon name={`${item.iconName}`}></ion-icon>
                  </span>
                  <span className='title'>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar