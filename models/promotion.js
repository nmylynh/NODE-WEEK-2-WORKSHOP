const mongoose = require('mongoose');
//This is making a shorthand to the mongoose.Schema function so we can refer to it as Schema:
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); //This will load the new currency type into mongoose so it's available to schemas
const Currency = mongoose.Types.Currency; //Shorthand for mongoose.Types.Currency

//Creating Schema:
const promotionSchema = new Schema({
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
  cost: {
    type: Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true //created at and updated at
});

//Creating Model: 
//First argument: Capitalized and singular version of the collection you want to use for this model; Promotion for promotions collection
//Second argument: Schema we want to use for this collection) 
//Returns a constructor function (A de-sugared class)
//Used to instantiate documents for mondoDB
const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;