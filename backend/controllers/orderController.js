const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Create new ORder
// POST http://localhost:4000/api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  })

  res.status(201).json({
    success: true,
    order,
  })

  // Sample-Payload newOrder
  //   {
  //     "itemsPrice": 200,
  //     "taxPrice": 36,
  //     "shippingPrice": 100,
  //     "totalPrice": 336,
  //     "orderItems": [
  //         {
  //             "product":"621300f6ecfa072f62d7f300",
  //             "name":"product1",
  //             "price":"1200",
  //             "image":"sample image",
  //             "quantity":1
  //         }
  //     ],
  //     "shippingInfo": {
  //         "address":"619 Los Angles",
  //         "city":"LA",
  //         "state":"California",
  //         "country":"India",
  //         "pinCode":"4000001",
  //         "phoneNo":12345678890
  //     },
  //     "paymentInfo":{
  //         "id":"sample paymentInfo",
  //         "status": "succeeded"
  //     }
  // }
})

// Get Single Order --
// GET http://localhost:4000/api/v1/order/621325c8be0a9f4513588f76
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }

  res.status(200).json({
    success: true,
    order,
  })

  // Sample-Payload - get all order details of single , by logged in user
  // {
  // BLANK
  // }
})

// Get Orders by logged in user -Non Admin
// GET http://localhost:4000/api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    orders,
  })

  // Sample-Payload - get all orders by logged in user
  // {
  // BLANK
  // }
})

// Get all Orders -- Admin
// GET http://localhost:4000/api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()

  let totalAmount = 0
  orders.forEach(order => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })

  // Sample-Payload - get all orders by logged in user
  // {
  // BLANK
  // }
})

// Update-Process Order Status(to say Delivered from previous state of processing) -- Admin
// PUT http://localhost:4000/api/v1/admin/order/621325c8be0a9f4513588f76
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return next(new ErrorHandler('Order not found by Id.', 404))
  }
  if (order.orderStatus === 'Delivered') {
    return next(
      new ErrorHandler('You have already been delivered this order item.', 404)
    )
  }

  order.orderItems.forEach(async order => {
    await updateStock(order.product, order.quantity)
  })

  order.orderStatus = req.body.status

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now()
  }

  await order.save({ validateBeforeSave: false })
  res
    .status(200)
    .json({ success: true, message: 'Order Has been Delivered Successfully' })

  // Sample-Payload - Update Order Status by Admin only
  // {
  //     "status":"Delivered"
  // }
})

// Helper function to update stock quantity
async function updateStock(id, quantity) {
  const product = await Product.findById(id)
  product.stock -= quantity
  await product.save({ validateBeforeSave: false })
}

// Self Delete Order By User -- Non Admin
// DELETE http://localhost:4000/api/v1/admin/order
exports.deleteMyOrder = catchAsyncErrors(async (req, res, next) => {
  req.body.updatedBy = req.user.id
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Order not found by Id.', 404))
  }

  await order.deleteOne({ _id: req.params.id })

  res.status(200).json({ success: true, message: 'Order Deleted Successfully' })
})

// Delete Order By ---  Admin
// DELETE http://localhost:4000/api/v1/orders/
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Order not found by Id.', 404))
  }

  await order.deleteOne({ _id: req.params.id })

  res.status(200).json({ success: true, message: 'Order Deleted Successfully' })
})
