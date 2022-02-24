const mongoose = require('mongoose')

const vulserverSchema = mongoose.Schema({
  server_name: {
    type: String,
    unique: true,    
    trim: true,
    required: [true, 'Please enter Server Name'],
  },
  server_status: {
    type: String,
    required: [true, 'Please enter Server Status'],
    enum: {
      values: [
        'active',
        'decomissioned',
        'decomissioning',
        'transition',
        'undefined',
      ],
      message:
        'Server status is either : active,decomissioned,decomissioning,transition,undefined',
    },
  },
  server_location: {
    type: String,
    required: [true, 'Please enter Server Location'],
    enum: {
      values: ['onprem', 'hosted', 'undefined'],
      message: 'Server location is either : onprem,hosted,undefined',
    },
  },
  server_os: {
    type: String,
    required: [true, 'Please enter Server Operating System'],
    enum: {
      values: ['windows', 'linux', 'undefined'],
      message: 'Server Operating is either : windows,linux,undefined',
    },
  },
  server_os_version: {
    type: String,
    default: 'undefined',
  },
  server_environment: {
    type: String,
    required: [false, 'Please enter Server Environment'],
    enum: {
      values: ['dev', 'test', 'prod'],
      message: 'Server Environment is either : dev,test,prod',
    },
    default: 'dev',
  },
  server_tanium_state: {
    type: String,
    required: [false, 'Please enter Tanium is Installed on this Server'],
    enum: {
      values: ['yes', 'no', 'undefined'],
      message: 'Tanium is Installed on this Server either : yes,no,undefined',
    },
    default: 'no',
  },
  server_usage: {
    type: String,
    required: [false, 'Please enter Usage of this Server'],
    default: 'undefined',
  },
  server_domain: {
    type: String,
    required: [false, 'Please enter Domain of this Server'],
    default: 'corp',
  },
  server_comments: {
    type: String,
    required: [false, 'Please enter additional comments of this Server'],
    default: 'undefined',
  },
  assigned_appname: {
    type: String,
    trim: true,
    required: [true, 'Please enter Application Name'],
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
module.exports = mongoose.model('Vulserver', vulserverSchema)

/*
Payload for Creating/Updating Server
{
    "server_name": "developmentserver1",
    "server_status": "active",
    "server_location": "onprem",
    "server_os": "windows",
    "server_domain": "pacs",
    "server_comments": "I love this server",
    "name": "6211b075e8b41d5d04dc6924",
    "createdBy": "6211b075e8b41d5d04dc6924",
    "updatedBy": "6211b075e8b41d5d04dc6924"
}

*/