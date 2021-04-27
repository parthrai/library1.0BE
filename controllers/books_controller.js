const { validationResult } = require('express-validator')

const Book = require('../models/book');
const Author = require('../models/author')

let DUMMY_DB = [
    {
        id:'b1',
        title:'Title for book 1',
        description: 'some fancy description for book1',
        author: 'a1',
        category: 'horror'
    },
    {
        id:'b2 programming',
        title:'this is book2',
        description: 'some fancy description for book2',
        author: 'a1',
        category: 'cooking'

    },
    {
        id:'b3',
        title:'some fancy book',
        description: 'some fancy description for book3',
        author: 'a1',
        category: 'horror'
    },
    {
        id:'b4',
        title:'book related to programming',
        description: 'some fancy description for book4',
        author: 'a2',
        category: 'fantasy'
    },
    {
        id:'b5',
        title:'cooking book',
        description: 'some fancy description for book5',
        author: 'a3',
        category: 'fantasy'
    }
]

//an Arrow function

const index = async (req, res)=>{

    let books

    try{
        books = await Book.find()

    }catch(e){
        return res.status(417).json({msg: e })
    }


    return res
            .status(200)
            .json({ books})

}

const show =(req, res) => {

    let book_id = req.params.book_id

    const book = DUMMY_DB.find( b => b.id === book_id )

    if(!book){

        return res.status(404).json({message: "Bossok not found"})
    }

    res.status(200).json({ book })
}

const booksByAuthor = (req, res) => {

    let author_id = req.params.author_id

    const book = DUMMY_DB.filter( b => b.author === author_id)

    if(!book){
        return res.status(404).json({message: "Book not found"})

    }

    res.status(200).json({ book })

}

const search =(req, res) => {

    const searchQuery = req.query.searchQuery
    const field = req.query.field
    let books;

    if(!field){
        books = DUMMY_DB.filter( b=>
            b.title.includes(searchQuery)
            || b.description.includes(searchQuery)
            || b.category.includes(searchQuery)
        )

    }

    if(field == 'title'){
         books = DUMMY_DB.filter( b =>
            b.title.includes(searchQuery)
        )
    }

    if( field == 'description'){
         books = DUMMY_DB.filter( b =>
            b.description.includes(searchQuery)
        )
    }

    if( field == 'category'){
        books = DUMMY_DB.filter( b =>
            b.category.includes(searchQuery)
        )
    }

    if(!books){
        return res.status(404).json({message: "Books not found"})
    }

    res.status(200).json({ books })
}

const store = async (req, res) =>{

    // 1. Receive body params from request.
    const {id, title, description, author_id, category} = req.body  // left side is called object destructuring

    // 2. Check if the author is a valid author.

    let author;

    try{
        author = await Author.findById(author_id)
    }catch (e){
        return res.status(500).json({message: "Please check the author_id. "})
    }





    // 3. Create an object for the new book
    const newBook = new Book({
        title,
        description,
        author_id,
        category ,
    })

    // 4. Saving the book using the model

    try{
        await newBook.save()
        author.books.push(newBook)
        await author.save()
    }catch (e){
        return res.status(500).json({message: e.toString()})

    }


    // 5. Sending a valid response

    return res.status(201).json({ book: newBook})
}

const update = (req, res)=>{

    let book_id = req.params.book_id

    // get data

    const {id, title, description, author, category} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json({errors})
    }

    const book = DUMMY_DB.find( b => b.id === book_id)

    book.title = title
    book.description = description
    book.category = category

    const bookIndex = DUMMY_DB.findIndex( b => b.id === book_id)

    DUMMY_DB[bookIndex] = book

    res.status(200).json({ message : "Book updated successfully!"})

}

const deleteBook = (req, res)=>{

    let book_id = req.params.book_id //b1

    DUMMY_DB = DUMMY_DB.filter( b => b.id !== book_id)

    res.status(200).json({ message : `Book deleted successfully`})

}

exports.index = index
exports.show = show
exports.BooksByAuthor = booksByAuthor
exports.search = search
exports.store = store
exports.update = update
exports.delete = deleteBook