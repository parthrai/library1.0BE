const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 9000

const bookRoutes = require('./routes/book')


app.use(bodyParser.json())

app.use('/api/books',bookRoutes)

app.listen(port, () => {
    console.log("development server start on port -"+ port)
})