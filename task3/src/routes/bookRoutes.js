import express from 'express'
export const router = express.Router()
import * as controller from '../controllers/controllers.js'

router.get('/', controller.getBooks)
router.get('/search', controller.searchBooks)
router.get('/:id', controller.getBooksId)
router.post('/',controller.createBook)
router.delete('/:id',controller.deleteBookId)