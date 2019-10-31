const express = require('express')
var session = require('express-session')

var enterController = require('./server/controller/enterController')
var meController = require('./server/controller/meController')
var dashboardController = require('./server/controller/dashboardController')
var friendController = require('./server/controller/friendController')


const app = express()

// express session
var sess = {
	secret: 'Reading app secret. cant guess',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 3600000 }
}

// set view engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('./public'))

app.use(session(sess))
app.set('trust proxy', 1)
app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
})

// controller
enterController(app, session)
meController(app, session)
dashboardController(app, session)
friendController(app, session)


app.listen(3000, ()=>{
	console.log('app is running on port 3000')
})