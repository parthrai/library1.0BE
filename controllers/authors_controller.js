const { validationResult } = require('express-validator')

const Author = require('../models/author')
const Book = require('../models/book')


// List of all the authors
const index = async (req, res) => {

    let authors;

    try{
        authors = await Author.find()
    }catch (e){
        return res.status(500).json({message: "Whoops, Something went wrong"})
    }

    return res.status(200).json( { authors})
}

// Details of a specific author
const show = async (req, res) =>{
    const authorId = req.params.author_id

    let author;
    try{
        author = await Author.findById(authorId)
    }catch (e){
        return res.status(500).json({message: "Whoops, Something went wrong"})
    }

    return res.status(200).json( { author })

}

// Create a new author
const store = async (req, res) =>{
    const { name, email, phone } = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({ errors })
    }

    const newAuthor = new Author({
        name,
        email,
        phone
    })

    try{
        await newAuthor.save()
    }catch (e){
        return res.status(500).json({ message : e.toString()})
    }

    return res.status(201).json( { author : newAuthor})
}

// Update an author
const update = async (req, res) =>{

    const author_id = req.params.author_id

    const { email, phone} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({ errors })
    }

    let author;

    try{
        author = await Author.findById(author_id)
    }catch (e){
        return res.status(500).json({ message : e.toString()})
    }

    author.email = email
    author.phone = phone

    try{
        await author.save()
    }catch (e){
        return res.status(500).json({ message: "Whoops, Something went wrong."})
    }

    return res.status(200).json({author})
}

// Delete an author
const deleteAuthor = async (req, res) =>{

     const author_id = req.params.author_id

     let author;

     try{
         author = await Author.findById(author_id)
     }catch (e) {
         return res.status(404).json({ message : e.toString()})
     }

     try{
         await Book.remove({author_id})
     }catch (e) {
         return res.status(500).json({ message: "Unable to delete books"})
     }

    try{
        await author.remove()
    }catch (e) {
        return res.status(500).json({ message: "Whoops, Something went wrong."})
    }

    return res.status(200).json({ message : "Author deleleted"})



}

// Search Author
const search = async (req, res) =>{

}


exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.deleteAuthor = deleteAuthor
exports.search = search
