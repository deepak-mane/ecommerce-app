const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')

// Create Product -- Admin
// POST http://localhost:4000/api/v1/admin/product/new
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id
  req.body.updatedBy = req.user.id

  const product = await Product.create(req.body)

  res.status(201).json({ success: true, product })

  // Sample-Payload Create Product
  //   {
  //     "name": "subscribe",
  //     "price": 211200,
  //     "description": "this is sample",
  //     "category": "machine",
  //     "images": {
  //         "public_id": "sample Image",
  //         "url": "sampleUrl"
  //     }
  // }
})

// Get All Products -- Non Admin

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = process.env.DISPLAY_ROWS
  const productCount = await Product.countDocuments()

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  const products = await apifeature.query
  res.status(200).json({ success: true, products, productCount, })
})

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.updatedBy = req.user.id
  let product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product not found',
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({ success: true, product })
})

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.updatedBy = req.user.id
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: 'Product not found' })
  }

  await product.deleteOne({ _id: req.params.id })

  res
    .status(200)
    .json({ success: true, message: 'Product Deleted Successfully' })
})

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  res.status(200).json({ success: true, product })
})

// Create New Review or Update the Review
// PUT http://localhost:4000/api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body
  const review = {
    updatedBy: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Product.findById(productId)

  const isReviewed = product.reviews.find(
    rev => rev.updatedBy.toString() === req.user._id.toString()
  )

  if (isReviewed) {
    product.reviews.forEach(rev => {
      if (rev.updatedBy.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment)
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  let avg = 0
  product.reviews.forEach(rev => {
    console.log('avg  is:', avg)
    console.log('rev.rating is:', rev.rating)
    avg += rev.rating
    console.log('avg :', avg)
  })

  product.ratings = avg / product.reviews.length

  await product.save({ validateBeforeSave: false })
  res
    .status(200)
    .json({ success: true, message: 'Product Reviews Updated Successfully' })

  // Sample-Payload - Create Review
  // {
  //   "productId":"6212dcfa8c56c423d0dc8bdf",
  //   "comment":"Not just okay product, but a Mindblowing one",
  //   "rating": 5
  // }
})

// Get All Reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

// Delete Reviews of a Product
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  let reviews = product.reviews.filter(
    rev => rev._id.toString() !== req.query.id.toString()
  )
  let ratings, numOfReviews

  //Array.isArray() method to confirm your array is an array.
  //This method determines if whether what was passed in is an array or not.
  //If what was passed in was an array, this method will return true.
  if (Array.isArray(reviews) && !reviews.length) {
    const reviews = []
    const ratings = 0
    const numOfReviews = 0
  } else {
    let avg = 0
    reviews.forEach(rev => {
      console.log('avg  is:', avg)
      console.log('rev.rating is:', rev.rating)
      avg += rev.rating
      console.log('avg :', avg)

      const ratings = avg / reviews.length
      const numOfReviews = reviews.length
    })


  }

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

// exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
// exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
// exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
// exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
