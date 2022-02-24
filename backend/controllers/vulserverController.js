const Vulserver = require('../models/vulserverModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')

// Create Vulserver -- Admin
exports.createVulserver = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const vulserver = await Vulserver.create(req.body)

  res.status(201).json({ success: true, vulserver })
})

// Get All Vulservers -- Non Admin

exports.getAllVulservers = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 5
  const vulserverCount = await Vulserver.countDocuments()

  const apifeature = new ApiFeatures(Vulserver.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  const vulservers = await apifeature.query
  res.status(200).json({ success: true, vulservers, vulserverCount })
})

// Update Vulserver -- Admin
exports.updateVulserver = catchAsyncErrors(async (req, res, next) => {
  let vulserver = await Vulserver.findById(req.params.id)

  if (!vulserver) {
    return res.status(500).json({
      success: false,
      message: 'Vulserver not found',
    })
  }

  vulserver = await Vulserver.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({ success: true, vulserver })
})

// Delete Vulserver -- Admin
exports.deleteVulserver = catchAsyncErrors(async (req, res, next) => {
  const vulserver = await Vulserver.findById(req.params.id)

  if (!vulserver) {
    return res
      .status(500)
      .json({ success: false, message: 'Vulserver not found' })
  }

  await vulserver.deleteOne({ _id: req.params.id })

  res
    .status(200)
    .json({ success: true, message: 'Vulserver Deleted Successfully' })
})

// Get Vulserver Details
exports.getVulserverDetails = catchAsyncErrors(async (req, res, next) => {
  const vulserver = await Vulserver.findById(req.params.id)

  if (!vulserver) {
    return next(new ErrorHandler('Vulserver not found', 404))
  }
  res.status(200).json({ success: true, vulserver })
})
