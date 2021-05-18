const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 9000

const bookRoutes = require('./routes/book')
const authorRoutes = require('./routes/author')


app.use(bodyParser.json())

app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')

    next()
})


app.use('/api/books',bookRoutes)
app.use('/api/authors', authorRoutes)

//

mongoose.connect('mongodb+srv://testuser:testpass123@cluster0.hovmx.mongodb.net/bookApp?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true })
.then( () => {
    app.listen(port, () => {
        console.log("development server start on port -"+ port)
    })
}).catch( () => {
    console.log("Unable to connect to db server")
})