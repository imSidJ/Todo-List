const mongoose = require('mongoose')
const Schema = mongoose.Schema

var todo = new Schema({
    title: String,
    id: String
})

module.exports =  mongoose.model('todo', todo)
