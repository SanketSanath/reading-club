const bodyParser = require('body-parser')
var authenticate= require('../middleware/authenticate')
var {mongoose, UserModel, ProgressModel} = require('../db/model')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app, session){
	app.get('/dashboard', authenticate, function(req, res){
		var username = req.session.username

		UserModel.findById(username, ['friends'], function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			var fr_list = data.friends.map(a => a._id)
			console.log(fr_list)

			ProgressModel.find({"username": {$in: fr_list}})
			.sort({'date': -1})
			.limit(30)
			.exec(function(err, data) {
				if(err){
					console.log(err)
					res.status(500).send('server error')
				}
				data = {progress: data}
				res.render('dashboard.ejs', data)
			});
		})
	})


	app.post('/update_daily', urlencodedParser, authenticate, function(req, res){
		var username = req.session.username
		var obj = {
			"b_name": req.body.book_name,
			"p_read": req.body.pages,
			"positive": req.body.feeling,
			"date": req.body.date
		}

		UserModel.findByIdAndUpdate(username, {$push: {progress: obj}, $inc : {'total_pages' : req.body.pages}}, function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			ProgressModel({
				username: username,
				b_name: req.body.book_name,
				p_read: req.body.pages,
				positive: req.body.feeling,
				date: req.body.date
			}).save(function(err, data){
				if(err){
					console.log(err)
					res.status(500).send('server error')
				}
				res.status(200).send('ok')
			})
		})

	})
}