const express = require('express')
const router = require('./routes/postRoutes')
const session = require('express-session')
const cookie = require('cookie-parser')


const app = express()
const PORT = 3000

app.use(express.json());
app.use(cookie())
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}))

app.use('/users',router)
app.use("/post", router)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})