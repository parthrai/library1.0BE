const express = require('express')
const router = express.Router()

const booksController = require('../controllers/books_controller')

// Define all the routes related to book entity

router.get('/', booksController.index)
router.get('/:book_id', booksController.show)
router.get('/author/:author_id', booksController.BooksByAuthor)
router.get('/search', booksController.search)
router.post('/', booksController.store)
router.patch('/:book_id', booksController.update)
router.delete('/:book_id', booksController.delete)

module.exports = router