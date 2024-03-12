const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true ,
    enum: ['option 1', 'option 2', 'option 3']
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  courses: {
    type: String,
    required: true ,
    enum: ['course1', 'course2', 'course3']
  },
  createdAt: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0) 
  }
});

const DetailsModel = mongoose.model('details', DetailsSchema); // details is for schema in mongodb

module.exports = DetailsModel;
