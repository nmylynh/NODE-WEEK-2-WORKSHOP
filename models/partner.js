const mongoose = require('mongoose');
//This is making a shorthand to the mongoose.Schema function so we can refer to it as Schema:
const Schema = mongoose.Schema;

//Creating Schema:
const partnerSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  description: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true
  },
  featured: {
      type: Boolean,
      default: false
  }
}, {
  timestamps: true //created at and updated at
});

//Creating Model: 
//First argument: Capitalized and singular version of the collection you want to use for this model; Partner for partners collection
//Second argument: Schema we want to use for this collection) 
//Returns a constructor function (A de-sugared class)
//Used to instantiate documents for mondoDB
const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;