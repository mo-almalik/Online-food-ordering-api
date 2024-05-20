
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {AppError} from '../utils/error.handler.js'
import v1Routers from './routers/v1.routers.js'

export const bootstrap =(app)=>{

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))


// Routers
app.use('/v1',v1Routers)
app.get('/v1/',(req,res)=>{res.send('welcome in api ')})
app.all('*', (req, res, next) => {throw new AppError('Route not found', 404)})


// Error 
app.use((err, req, res, next) => {
    const { message, status, stack } = err
    res.status(status || 500).json({
        message,
        ...(process.env.MODE === 'development' && { stack }),
    })
})

}