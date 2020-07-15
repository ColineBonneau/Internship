const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task_set = new Schema(
    {
        name: { type: String, required: true},
        NumberOfTasks_M: { type: Number, required: true},
        NbOfAlternativesTasks_my: { type: Number, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('task_set', Task_set)