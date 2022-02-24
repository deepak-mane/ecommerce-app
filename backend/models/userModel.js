const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter your name'],
      maxLength: [30, 'Name cannot be more than 30 characters'],
      minLength: [4, 'Name should be at least 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please Enter your password'],
      maxLength: [30, 'Password cannot be more than 30 characters'],
      minLength: [8, 'Password should be at least 8 characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log('enteredPassword : ', enteredPassword)
  console.log('this.password : ', this.password)
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating TOKEN
  const resetToken = crypto.randomBytes(20).toString('hex')
  // Hashing and adding to resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', userSchema)
