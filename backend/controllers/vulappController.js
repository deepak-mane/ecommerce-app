const Vulapp = require('../models/vulappModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')

// Create Vulapp -- Admin
exports.createVulapp = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const vulapp = await Vulapp.create(req.body)

  res.status(201).json({ success: true, vulapp })
})

// Get All Vulapps -- Non Admin

exports.getAllVulapps = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 5
  const vulappCount = await Vulapp.countDocuments()

  const apifeature = new ApiFeatures(Vulapp.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  const vulapps = await apifeature.query
  res.status(200).json({ success: true, vulapps, vulappCount })
})

// Update Vulapp -- Admin
exports.updateVulapp = catchAsyncErrors(async (req, res, next) => {
  let vulapp = await Vulapp.findById(req.params.id)

  if (!vulapp) {
    return res.status(500).json({
      success: false,
      message: 'Vulapp not found',
    })
  }

  vulapp = await Vulapp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({ success: true, vulapp })
})

// Delete Vulapp -- Admin
exports.deleteVulapp = catchAsyncErrors(async (req, res, next) => {
  const vulapp = await Vulapp.findById(req.params.id)

  if (!vulapp) {
    return res
      .status(500)
      .json({ success: false, message: 'Vulapp not found' })
  }

  await vulapp.deleteOne({ _id: req.params.id })

  res
    .status(200)
    .json({ success: true, message: 'Vulapp Deleted Successfully' })
})

// Get Vulapp Details
exports.getVulappDetails = catchAsyncErrors(async (req, res, next) => {
  const vulapp = await Vulapp.findById(req.params.id)

  if (!vulapp) {
    return next(new ErrorHandler('Vulapp not found', 404))
  }
  res.status(200).json({ success: true, vulapp })
})
