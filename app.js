const express = require('express')
const app = express()
const port = 9000

const bookRoutes = require('./routes/book')

app.use('/api/books',bookRoutes)


app.listen(port, () => {
    console.log("development server start on port -"+ port)
})