let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let moment = require('moment')

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))


// Routes
app.get('/', (request, response) => {
  let Message = require('./models/message')
  Message.all(function (messages) {
    response.render('pages/index', {messages: messages, moment: moment})
  })
})

app.get('/message/:id', (req, res) => {
  let Message = require('./models/message')
  Message.find(req.params.id, function (message) {
    res.render('messages/show', {message: message, moment: moment})
  })
})

app.post('/', (request, response) => {
  if (request.body.message === undefined || request.body.message === '') {
    request.flash('error', "Vous n'avez pas poste de message")
    response.redirect('/')
  } else {
      let Message = require('./models/message')
      Message.create(request.body.message, function () {
      request.flash('success', "Merci")
      response.redirect('/')
      })
    }
})

app.listen(8080)
