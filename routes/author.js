const express = require('express')
const router = express.Router()

const {check} = require('express-validator')


const authorController = require('../controllers/authors_controller')

router.get('/', authorController.index)
router.get('/search', authorController.search)
router.get('/:author_id', authorController.show)
router.post('/',[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('phone').isMobilePhone()
], authorController.store)

router.patch('/:author_id',[
    check('email').isEmail(),
    check('phone').isMobilePhone()
], authorController.update)

router.delete('/:author_id', authorController.deleteAuthor)



module.exports = router