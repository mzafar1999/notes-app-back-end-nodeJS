const express = require('express')
const dotenv = require('dotenv')
const app = express()
const userRoute = require('./routes/userRoutes')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())
dotenv.config()
app.use('/api/users', userRoute)
const start = () => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, async() => {
        console.log('server is listening on port: ' + PORT);
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log('DB Connected successfully');
        } catch (error) {
            console.log(error);
        }
    })
}

start()