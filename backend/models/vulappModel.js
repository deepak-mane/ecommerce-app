const mongoose = require('mongoose')

const vulappSchema = mongoose.Schema(
  {
    application_name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please enter Application Name'],
    },
    application_description: {
      type: String,
      trim: true,
      required: [true, 'Please enter Application Description'],
    },
    application_status: {
      type: String,
      required: [true, 'Please enter Application Status'],
      enum: {
        values: [
          'active',
          'decomissioned',
          'decomissioning',
          'transition',
          'undefined',
        ],
        message:
          'Application status is either : active,decomissioned,decomissioning,transition,undefined',
      },
    },
    application_location: {
      type: String,
      required: [true, 'Please enter Application Location'],
      enum: {
        values: ['onprem', 'hosted', 'undefined'],
        message: 'Application location is either : onprem,hosted,undefined',
      },
    },
    application_manager: {
      type: String,
      required: [true, 'Please enter Application Manager'],
    },
    application_rating: {
      type: Number,
      default: 0,
    },
    application_url: {
      type: String,
      default: 'undefined',
    },
    application_dept: {
      type: String,
      default: 'undefined',
    },
    application_comments: {
      type: String,
      required: [false, 'Please enter additional comments of this Applicaiton'],
      default: 'undefined',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },    
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Vulapp', vulappSchema)

/*
Payload for Creating/Updating Application
{
    "application_name": "app1",
    "application_description": "this is sample app1",
    "application_status": "active",
    "application_location": "onprem",
    "application_manager": "deepak",
    "application_url": "http://localhost:4000/api/vi/getallvulapps",
    "application_dept": "corporates",
    "application_comments": "API for VulApps",
    "createdBy": "6211b075e8b41d5d04dc6924",
    "updatedBy": "6211b075e8b41d5d04dc6924"    
}

*/