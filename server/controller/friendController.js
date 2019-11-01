const bodyParser = require('body-parser')

var authenticate= require('../middleware/authenticate')
var {mongoose, UserModel} = require('../db/model')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, session) {
	app.get('/findpeople', authenticate, function(req, res){

		UserModel.find({}, ['name', 'username'], function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			res.render('find_people.ejs', {data})

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
				res.status(404).send('User doesnot exist')
			} else {
				data = {
					name: data.name,
					username: data.username,
					total_pages: data.total_pages,
					star: calculateStar(data.total_pages),
					books_read: data.books_read,
					progress: data.progress,
					friends: data.friends,
					followers: data.followers
				}
				res.render('profile.ejs', data)
			}
		})
	})

	app.post('/follow_user', authenticate, urlencodedParser, function(req, res){
		var username = req.session.username
		var add_id = req.body.id

		// find user whom user is going to follow
		UserModel.findById(add_id, ['name'], function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			var friendupd = {
				_id: data._id,
				name: data.name
			}

			// find name of user and add to the list of follower
			add_follower(username, add_id)

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

function add_follower(follower, followed){
	UserModel.findById(follower, ['name'], function(err, data){
		if(err){
			console.log(err)
		}

		var follower_obj = {
			_id: data._id,
			name: data.name
		}

		UserModel.findByIdAndUpdate(followed, { $addToSet: {followers: follower_obj}}, function(err, data){
			if(err)
				console.log(err)
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