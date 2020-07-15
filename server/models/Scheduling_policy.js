const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Scheduling_Policy = new Schema(
    {
        name: { type: String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('schedulingPolicy', Scheduling_Policy)