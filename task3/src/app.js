import express from 'express'
import * as routes from './routes/bookRoutes.js'
import * as errorhander from './middleware/errorHandler.js'
import morgan from 'morgan'

export const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/books',routes.router)
app.use(errorhander.errorHandler)
