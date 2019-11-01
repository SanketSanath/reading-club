const bodyParser = require('body-parser')
var authenticate= require('../middleware/authenticate')
var {mongoose, UserModel, ProgressModel} = require('../db/model')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, session) {
	app.get('/me', authenticate, function(req, res){
		var username = req.session.username

		// get user detail
		UserModel.findById(username, {progress:{$slice:-21}}, function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			if(data == null){
				res.status(404).send('User not exist')
			} else {
				data = {
					name: data.name,
					username: data._id,
					total_pages: data.total_pages,
					star: calculateStar(data.total_pages),
					books_read: data.books_read,
					progress: data.progress,
					friends: data.friends,
					followers: data.followers
				}

				data.books_read.sort(function(m1, m2) { return m1.rating - m2.rating; })
				res.render('me.ejs', data)
			}
		})
	})

	app.post('/add_book', urlencodedParser, authenticate, function(req, res){
		var username = req.session.username
		var b_name = req.body.b_name
		var author = req.body.author
		var rating = req.body.book_rating
		var review = req.body.review

		if(b_name.length == 0 || author.length == 0 || review.length == 0)
			res.status(415).send('incomplete data')
		else{
			var book = {"b_name": b_name, "b_author": author, "rating": rating, "review": review}
			UserModel.findByIdAndUpdate(username, {$push: {books_read: book}}, function(err, data){
				if(err){
					console.log(err)
					res.status(500).send('server error')
				}
				res.status(200).send('ok')
			})
		}
		
	})

	app.delete('/delete_book', urlencodedParser, authenticate, function(req, res){
		var username = req.session.username
		var book_id = req.body.book_id

		// console.log(username)
		// console.log(book_id)

		if(book_id === '' || book_id === undefined || book_id === null)
			res.status(415)

		// delete book
		UserModel.findByIdAndUpdate( username, { $pull: {books_read: {_id: book_id} }}, { safe: true, multi:true }, function(err, data){
			if(err){
				console.log(err)
				res.status(500).send('server error')
			}
			res.status(200).send('ok')
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