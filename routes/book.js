const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const booksController = require('../controllers/books_controller')

// Define all the routes related to book entity

router.get('/', booksController.index)
router.get('/search', booksController.search)
router.get('/:book_id', booksController.show)
router.get('/author/:author_id', booksController.BooksByAuthor)
router.post('/',
    [
        check('title', 'Please enter a valid value for title').not().isEmpty(),
        check('description', 'please enter a valid value for description, min 4 and max 50 ').isLength({min:4, max:50})
    ],booksController.store)

router.patch('/:book_id',
    [
        check('title', 'Please enter a valid value for title').not().isEmpty(),
        check('description', 'please enter a valid value for description, min 4 and max 50 ').isLength({min:4, max:50})
    ], booksController.update)

router.delete('/:book_id', booksController.delete)

module.exports = router