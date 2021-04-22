const express = require('express')
const router = express.Router()

const booksController = require('../controllers/books_controller')

// Define all the routes related to book entity

router.get('/', booksController.index)
router.get('/:book_id', booksController.show)
router.get('/author/1', booksController.BooksByAuthor)
router.get('/search', booksController.search)
router.post('/', booksController.store)
router.patch('/1', booksController.update)
router.delete('/1', booksController.delete)

module.exports = router