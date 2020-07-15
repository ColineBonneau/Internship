const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TaskSchema =  new Schema(
   {
       name: { type: String, required: 'This field is required'},
       Deadline_D: { type: Number},
       Period_T: { type: Number},
       Segment_number_N: { type: Number },
       Execution_time: { type: String},
       Execution_time_parallel_sgts: { type: String},   
    },
)

mongoose.model('task', TaskSchema)