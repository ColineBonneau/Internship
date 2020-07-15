const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Simulation =  new Schema(
   {
       name: { type: String, required: 'This field is required'},
   },
)

mongoose.model('simu', Simulation)