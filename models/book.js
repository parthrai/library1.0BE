const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    category : {type:String, required:true},
    author_id : {type: mongoose.Types.ObjectId, required:true, ref: 'Author' }
})

module.exports = mongoose.model("Book", bookSchema)

