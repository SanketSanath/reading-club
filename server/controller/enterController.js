const bodyParser = require('body-parser')

var {mongoose, UserModel} = require('../db/model')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, session){

	app.get('/', function(req, res){
		res.render('enter.ejs')
	})

	app.post('/register', urlencodedParser, function(req, res){
		var name = req.body.name
		var username = req.body.username
		var password = req.body.password
		var newUser = {
			_id: username,
			name, username, password, total_pages: 0, private_account: false,
			books_read: [], progress: [], friends: []
		}

		UserModel.findById(username, function(err, data){
			if(err) throw err
			if(data == null){
				UserModel(newUser).save(function(err, data){
					if(err) throw err
					req.session.username=data.username
					res.status(200).send('ok')
				})
			} else {
				res.status(409).json(data)
			}
		})

	})

	app.post('/login', urlencodedParser, function(req, res){
		var username = req.body.username
		var password = req.body.password
		UserModel.findById(username, function(err, data){
			if(err) throw err
			if(data == null){
				res.status(404).send('User not exist')
			} else if(data.password === password){
				// user exist and password is correct
				req.session.username=data.username
				res.status(200).send('ok')
			} else if(data.password !== password){
				res.status(401).send('incorrect password')
			} else{
				res.status(400).send('some error occured, please try after sometime')
			}
		})
	})

	app.get('/logout',(req,res)=> {
		req.session.destroy()
		res.redirect('/')
	})
}