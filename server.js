let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

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
  console.log(request.session)
  response.render('pages/index')
})

app.post('/', (request, response) => {
  console.log(request.body.message)
  if (request.body.message === undefined || request.body.message === '') {
    request.flash('error', "Vous n'avez pas poste de message")
    response.redirect('/')
  }
  else {

  var MongoClient = require('mongodb').MongoClient
    , assert = require('assert')

  // Connection URL
  var url = 'mongodb://localhost:27017/matcha';
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err)
    console.log("Connected correctly to server")

    db.close();
  })

  }
})
app.listen(8080)
