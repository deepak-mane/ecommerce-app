import React, { useState } from 'react'
import SideBar from './SideBar/SideBar'
import Header from './Header/Header'
import Footer from './Footer/Footer'


// Import this component specific stylesheet
import './Layout.css'

function Layout(props) {
  const [showSideBar, setShowSideBar] = useState(true)
  const [logoImage, setLogoImage ] = useState(true)

  return (
    <div className='layout-container'>
        <div className='sidebar'><SideBar showSideBar={showSideBar} logoImage={logoImage}/></div>
        <div className={`main${showSideBar ? '' : ' active'}`}>
          <div>
            <Header 
            showSideBar={showSideBar} 
            setShowSideBar={setShowSideBar}
            logoImage={logoImage}
            setLogoImage={setLogoImage} />
          </div>
          <div className=''>{props.children}</div>
          <div><Footer /></div>
        </div>
    </div>
  )
}

export default Layout
