const bodyParser = require('body-parser')
var authenticate= require('../middleware/authenticate')
var {mongoose, UserModel, ProgressModel} = require('../db/model')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app, session){
	app.get('/dashboard', authenticate, function(req, res){
		var username = req.session.username

		UserModel.findById(username, ['friends'], function(err, data){
			if(err) throw err
			var fr_list = data.friends.map(a => a._id)
			console.log(fr_list)

			ProgressModel.find({"username": {$in: fr_list}}, function(err, data){
				console.log(data)
				data = {progress: data}
				res.render('dashboard.ejs', data)
			})
		})
	})
}