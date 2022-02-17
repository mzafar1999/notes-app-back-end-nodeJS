const express = require('express')
const dotenv = require('dotenv')
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.status(200).json('working')
})

app.listen(PORT, () => {
    console.log('server is listening on port' + PORT);
})