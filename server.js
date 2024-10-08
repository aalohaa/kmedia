const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const port = 4000

const index = require('./routes/index')
const auth = require('./routes/auth')

app.use('/views', express.static(path.join(__dirname + '/views')))
app.use('/public', express.static(path.join(__dirname + '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('trust proxy', 1)
app.use(session({
    secret: 'kmedia-token-123-5a9c8f4e2',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', index)
app.use('/auth', auth)

app.listen(port, () => {
    console.log(`app is running on port http://localhost:${port}`)
})