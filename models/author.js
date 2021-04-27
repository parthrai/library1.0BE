const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name : {type:String, required: true},
    email : {type:String, required: true},
    phone : {type:String, required: true},
    books: [{type: mongoose.Types.ObjectId, required:true, ref:'Book'}]
})

module.exports = mongoose.model("Author", authorSchema)