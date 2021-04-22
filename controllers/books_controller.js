

//an Arrow function

const index = (req, res)=>{
    return res.send("Here, I will show list of all the books")

}

const show =(req, res) => {

    res.send("Here, I will return book with id 1")
}

const booksByAuthor = (req, res) => {
    res.send("Here, I will return all the books for author 1")

}

const search =(req, res) => {
    res.send("You can perform search from this endpoint")
}

const store = (req, res) =>{
    res.send("You can create a new books from this endpoint")
}

const update = (req, res)=>{
    res.send("You can update a book from this endpoint")

}

const deleteBook = (req, res)=>{
    res.send("You can delete a booksfrom this endpoint")

}

exports.index = index
exports.show = show
exports.BooksByAuthor = booksByAuthor
exports.search = search
exports.store = store
exports.update = update
exports.delete = deleteBook