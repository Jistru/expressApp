require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//connect too DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //listen requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port 4000')
        })
    })

    .catch((error) => {
        console.log(error)
    })

