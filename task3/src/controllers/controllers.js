import Joi from "joi";
import {bookSchema} from '../utils/validationSchema.js'

let books = []
export const getBooks = (req,res) => {
    res.status(200).json(books)
}

export const searchBooks = (req,res) => {
    res.status(200).type('plain').send('You are in the search page')
}

export const getBooksId = (req,res) => {
    const {id} = req.params
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            res.status(200).json(books[i])
            return
        }
    }

    res.status(404).type('plain').send('Not found')
}

export const createBook = (req,res) => {
    const {error} = bookSchema.validate(req.body)

    if (error) {
        res.status(400).json({
            error: error.details[0].message
        })
        return
    }

    let book = {
        id: books.length+1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
    }

    books.push(book)

    res.status(201).json({
        message: 'Created',
        user: req.body
    })
}

export const deleteBookId = (req,res) => {
    const {id} = req.params
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            books.splice(i,1)
            res.status(200).json({
                message: 'removed'
            })
            return
        }
    }

    res.status(404).type('plain').send('Not found')
}
