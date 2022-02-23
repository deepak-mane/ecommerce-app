import React from 'react'

// Import other components dependendency
import PolarAreaChartGraph from '../../components/Charts/PolarAreaChartGraph'
import BarChartGraph from '../../components/Charts/BarChartGraph'
import Layout from '../../components/Layout/Layout'

// Import this component specific stylesheet
import './DashboardPage.css'

function DashboardPage() {
  return (
    <Layout>
      <div className='dashboard-container'>
        {/*   cards   */}
        <div className='cardBox'>
          <div className='card'>
            <div>
              <div className='numbers'>1,504</div>
              <div className='cardName'>Daily Views</div>
            </div>
            <div className='iconBx'>
              <ion-icon name='eye-outline'></ion-icon>
            </div>
          </div>

          <div className='card'>
            <div>
              <div className='numbers'>80</div>
              <div className='cardName'>Sales</div>
            </div>
            <div className='iconBx'>
              <ion-icon name='cart-outline'></ion-icon>
            </div>
          </div>

          <div className='card'>
            <div>
              <div className='numbers'>284</div>
              <div className='cardName'>Comments</div>
            </div>
            <div className='iconBx'>
              <ion-icon name='chatbubbles-outline'></ion-icon>
            </div>
          </div>

          <div className='card'>
            <div>
              <div className='numbers'>$7,842</div>
              <div className='cardName'>Earning</div>
            </div>
            <div className='iconBx'>
              <ion-icon name='cash-outline'></ion-icon>
            </div>
          </div>
        </div>
        {/*   END cards   */}

        {/* charts */}
        <div className='graphBox'>
          <div className='box'>
            <PolarAreaChartGraph />
          </div>

          <div className='box'>
            <BarChartGraph />
          </div>
        </div>
        {/* END charts */}

        {/*   Details  list   */}
        <div className='details'>
          {/*   order details  list   */}
          <div className='recentOrders'>
            <div className='cardHeader'>
              <h2>Recent Orders</h2>
              <a href='/' className='btn'>
                View All
              </a>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Star Refrigerator</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td>
                    <span className='status delivered'>Delivered</span>
                  </td>
                </tr>
                <tr>
                  <td>Window Cooler</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td>
                    <span className='status pending'>Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>Speakers</td>
                  <td>$620</td>
                  <td>Paid</td>
                  <td>
                    <span className='status return'>Return</span>
                  </td>
                </tr>
                <tr>
                  <td>Hp Laptop</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td>
                    <span className='status inprogress'>In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td>Apple watch</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td>
                    <span className='status delivered'>Delivered</span>
                  </td>
                </tr>
                <tr>
                  <td>Wall Fan</td>
                  <td>$110</td>
                  <td>Paid</td>
                  <td>
                    <span className='status pending'>Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>Adidas Shoes</td>
                  <td>$620</td>
                  <td>Paid</td>
                  <td>
                    <span className='status return'>Return</span>
                  </td>
                </tr>
                <tr>
                  <td>Denim Shirts</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td>
                    <span className='status inprogress'>In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td>Casual Shoes</td>
                  <td>$575</td>
                  <td>Paid</td>
                  <td>
                    <span className='status pending'>Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>Samsung 65" Full HD Smart TV</td>
                  <td>$3000</td>
                  <td>Paid</td>
                  <td>
                    <span className='status delivered'>Delivered</span>
                  </td>
                </tr>
                <tr>
                  <td>Apple iMac Desktop 27"</td>
                  <td>$2400</td>
                  <td>Paid</td>
                  <td>
                    <span className='status delivered'>Delivered</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/*   END order details list   */}

          {/*   New Customers List   */}

          <div className='recentCustomers'>
            <div className='cardHeader'>
              <h2>Recent Customers</h2>
            </div>
            <table>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user1-derivatives\user1-50_x_50.jpg'
                      alt='user1'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    David
                    <br />
                    <span>Tel Aviv,Israel</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user2-derivatives\user2-50_x_50.jpg'
                      alt='user2'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Daniel
                    <br />
                    <span>Paris,France</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user3-derivatives\user3-50_x_50.jpg'
                      alt='user3'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Dimitri
                    <br />
                    <span>Singapore</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user4-derivatives\user4-50_x_50.jpg'
                      alt='user4'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Don
                    <br />
                    <span>Zurich,Switzerland</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user5-derivatives\user5-50_x_50.jpg'
                      alt='user5'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Dilip
                    <br />
                    <span>Hong Kong,China</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user6-derivatives\user6-50_x_50.jpg'
                      alt='user6'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Dhruv
                    <br />
                    <span>New York,USA</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user7-derivatives\user7-50_x_50.jpg'
                      alt='user7'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Daksh
                    <br />
                    <span>Geneva,Switzerland</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user8-derivatives\user8-50_x_50.jpg'
                      alt='user8'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Dara
                    <br />
                    <span>Copenhagen,Denmark</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user9-derivatives\user9-50_x_50.jpg'
                      alt='user9'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Dharam
                    <br />
                    <span>Los Angeles,USA</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width='60px'>
                  <div className='imgBx'>
                    <img
                      src='images\user10-derivatives\user10-50_x_50.jpg'
                      alt='user10'
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    Danny
                    <br />
                    <span>Osaka,Japan</span>
                  </h4>
                </td>
              </tr>
            </table>
          </div>

          {/*   END new customers List   */}
        </div>
        {/*   END Details  list   */}
      </div>
    </Layout>
  )
}

export default DashboardPage
