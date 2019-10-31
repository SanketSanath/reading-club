const bodyParser = require('body-parser')

var authenticate= require('../middleware/authenticate')
var {mongoose, UserModel} = require('../db/model')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, session) {
	app.get('/find_friend', authenticate, function(req, res){

		UserModel.find({}, ['name', 'username'], function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			res.render('find_friend.ejs', {data})

		})
	})

	app.get('/profile/:id', authenticate, function(req, res){
		var username = req.params.id

		UserModel.findById(username, {progress:{$slice:-14}}, function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			if(data == null){
				res.status(404).send('User not exist')
			} else {
				data = {
					name: data.name,
					username: data.username,
					total_pages: data.total_pages,
					star: calculateStar(data.total_pages),
					books_read: data.books_read,
					progress: data.progress,
					friends: data.friends
				}
				res.render('profile.ejs', data)
			}
		})
	})

	app.post('/add_friend', authenticate, urlencodedParser, function(req, res){
		var username = req.session.username
		var add_id = req.body.id

		UserModel.findById(add_id, ['name'], function(err, data){
			console.log('data'+ data)
			var friendupd = {
				_id: data._id,
				name: data.name
			}

			UserModel.findByIdAndUpdate(username, { $addToSet: {friends: friendupd}}, function(err, data){
				if(err){
					console.log(err)
					res.status(500).send('server error')
				}
				res.status(200).send('ok')
			})
		})
	})
}



function calculateStar(total_pages) {
	if(total_pages < 500)
		return 0
	else if(total_pages < 1000)
		return 1
	else if(total_pages < 2000)
		return 2
	else if(total_pages < 5000)
		return 3
	else if(total_pages < 10000)
		return 4
	else if(total_pages < 20000)
		return 5
	else if(total_pages < 50000)
		return 6
	else
		return 7
}