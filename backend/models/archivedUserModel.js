const mongoose = require('mongoose')
const validator = require('validator')

const archivedUserSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('ArchivedUser', archivedUserSchema)
