import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Import other components dependendency
import Product from '../../components/Product/Product'
import MetaData from '../../components/Layout/MetaData'
import Layout from '../../components/Layout/Layout'
import { getProducts } from '../../actions/productsAction'

// Import this component specific stylesheet
import './HomePage.css'


const demoproduct = {
  name: "COOFANDY Men's Dress Shirt Long Sleeve Casual Button Down Shirts",
  images: [
    { url: 'https://m.media-amazon.com/images/I/617K5+a-ekL._AC_UX466_.jpg' },
  ],
  price: '$33',
  _id: 'deepak',
}
function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <Layout>
      <MetaData title='ECOMMERCE' />
      <div className='HomePage' id='HomePage'>
        <div id='nav-main' className='nav-sprite'>
          <div id='nav-xshop-container'>
            <div id='nav-xshop' className='nav-fill nav-progressive-content'>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Elite</span>
                </Link>
              </div>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Ecommerce Basics</span>
                </Link>
              </div>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Best Sellers</span>
                </Link>
              </div>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Buy Again</span>
                </Link>
              </div>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Home Improvements</span>
                </Link>
              </div>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Customer Service</span>
                </Link>
              </div>
              <div>
                <Link to='/' id='nav-a' className=''>
                  <span className='prime'>Today's Deals</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*START OF HOMEPAGE-CONTAINER*/}
        <div className='HomePage-container' id='HomePage-container'>
          <div className='search-filter-column'></div>
          <div className='search-results-container'>
            {/*{products && products.map((product)=> <Product product={product} />)}
        <Product product={product} />*/}
        {products && products.map((product)=> <Product key={product._id} product={product}/>)}
          </div>
        </div>
        {/*END OF HOMEPAGE-CONTAINER*/}
      </div>
      {/*END OF HOMEPAGE */}
    </Layout>
  )
}

export default HomePage
