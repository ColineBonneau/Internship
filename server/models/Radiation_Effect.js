const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Radiation_Effect =  new Schema(
   {
       name: { type: String, required: 'This field is required'},
       RadiationType_V: { type: String},  
    },
)

mongoose.model('radiation', Radiation_Effect)