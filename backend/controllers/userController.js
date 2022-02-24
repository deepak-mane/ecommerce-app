const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const ApiFeatures = require('../utils/apifeatures')

// Register User
// POST http://localhost:4000/api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'This is simple id',
      url: 'profilepicUrl',
    },
  })

  sendToken(user, 200, res)

// Sample-Payload Register User
// {
//     "name": "user1",
//     "email":"deepak.mane@gmail.com",
//     "password":"password"
// }

})

// Login User
// POST http://localhost:4000/api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  // checking for both email and password
  if (!email || !password) {
    return next(new ErrorHandler('Please enter Email and Password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)
  console.log('isPasswordMatched: ', isPasswordMatched)
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  sendToken(user, 200, res)

// Sample-Payload Login User
// {
//     "email":"maildeepakmane@gmail.com",
//     "password":"12345678"
// } 
})

// Logout User
// GET http://localhost:4000/api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  })
// Sample-Payload Logout User
// {
// } 

})

// Forgot Password
// POST http://localhost:4000/api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  }

  // Get ResetPasswordToken
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you  have not requested this email then, please ignore it.`


  try {
    await sendEmail({
      email: user.email,
      subject: `${process.env.APP_NAME} Password Recovery`,
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false})

    return next(new ErrorHandler(error.message, 500))
  }

// Sample-Payload Forgot password
//   {
//     "email":"maildeepakmane@gmail.com"
// } 
})

// Reset Password
// PUT http://localhost:4000/api/v1/password/reset/66ad0c3c7a91dbeece46bf82d6639bf743339bde
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  // Creating Token Hash
  const resetPasswordToken = crypto
  .createHash('sha256')
  .update(req.params.token)
  .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  
  if (!user) {
    return next(new ErrorHandler('Reset Password Token is invalid or has been expired', 400))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler('Password does not match', 400))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, 200, res)

// Sample-Payload Forgot password
//   {
//     "password":"12345678",
//     "confirmPassword":"12345678"
// } 

})

// Get User Details
// GET http://localhost:4000/api/v1/me
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })


//  Sample - Payload
//   {
// 
//   } 

})


// Update User Password
// PUT http://localhost:4000/api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
  console.log('isPasswordMatched: ', isPasswordMatched)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is Incorrect', 400))
  }

  if(req.body.newPassword !== req.body.confirmPassword ){
    return next(new ErrorHandler('Passwords do not match', 400))
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)

//  Sample - Payload
//   {
//     "oldPassword" : "12345678",
//     "newPassword" : "password",
//     "confirmPassword":"password"
//   } 

})


// Update User Profile
// PUT http://localhost:4000/api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  const newUserData={
    name: req.body.name,
    email: req.body.email,
  }
  // WE will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new: true,
    runValidators: true,
    useFindAndModify:false,
  })

  res.status(200).json({
    success: true,  
    message: `${req.body.name} , your profile has been successfully updated`,  
  })

//  Sample - Payload
// {
//   "name": "Deepak Mane",
//   "email":"deepak.mane@gmail.com"
// } 

})


// Get All Users -- Admin only
// GET http://localhost:4000/api/v1/me/update
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = process.env.DISPLAY_ROWS
  const userCount = await User.countDocuments()

  const apifeature = new ApiFeatures(User.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  const users = await apifeature.query
  res.status(200).json({ success: true, users, userCount })

//  Sample - Payload
// {
//  BLANK
// } 
})

// Get Single User -- Admin only
// GET http://localhost:4000/api/v1/me/update
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`))
  }

  res.status(200).json({
    success: true,  
    user
  }) 

//  Sample - Payload
// {
//  BLANK
// } 
})


// Update User Role -- Admin only
// PUT http://localhost:4000/api/v1/admin/user/6212817314e5fccdc2715e24 -- id of user to be updated
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

  const newUserData={
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
    new: true,
    runValidators: true,
    useFindAndModify:false,
  })

  res.status(200).json({
    success: true,  
    message: `User : ${user.name} , Profile has been successfully updated`,  
  })

//  Sample - Payload
// {
//   "name": "dsfasfd",
//   "email":"afdfasfsd@gmail.com",   
//   "role": "admin"
// }

})


// Delete User  -- Admin only
// DELETE http://localhost:4000/api/v1/admin/delete
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`))
  }


  await user.deleteOne({ _id: req.params.id })
  res.status(200).json({
    success: true,  
    message: `User : ${user.name} , Deleted successfully!!!`,  
  })

//  Sample - Payload
// {
// 
// } 

})