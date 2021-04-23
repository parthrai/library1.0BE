
let DUMMY_DB = [
    {
        id:'b1',
        title:'Title for book 1',
        description: 'some fancy description for book1',
        author: 'a1',
        category: 'horror'
    },
    {
        id:'b2',
        title:'Title for book 2',
        description: 'some fancy description for book2',
        author: 'a1',
        category: 'cooking'

    },
    {
        id:'b3',
        title:'Title for book 3',
        description: 'some fancy description for book3',
        author: 'a1',
        category: 'horror'
    },
    {
        id:'b4',
        title:'Title for book 4',
        description: 'some fancy description for book4',
        author: 'a2',
        category: 'fantasy'
    },
    {
        id:'b5',
        title:'Title for book 5',
        description: 'some fancy description for book5',
        author: 'a3',
        category: 'fantasy'
    }
]

//an Arrow function

const index = (req, res)=>{
    return res
            .status(200)
            .json({ books : DUMMY_DB})

}

const show =(req, res) => {

    let book_id = req.params.book_id

    const book = DUMMY_DB.find( b => b.id === book_id )

    if(!book){

        return res.status(404).json({message: "Book not found"})
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
    res.json({ message : "You can perform search from this endpoint"})
}

const store = (req, res) =>{
    res.status(201).json({ message : "You can create a new books from this endpoint"})
}

const update = (req, res)=>{

    let book_id = req.params.book_id


    res.status(200).json({ message : `You can update a book from this endpoint ${book_id}`})

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