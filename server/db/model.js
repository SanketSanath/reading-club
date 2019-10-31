const mongoose = require('mongoose')


DB_USERNAME = process.env.DB_USERNAME
DB_PASSWORD = process.env.DB_PASSWORD


// connect to mongodb database
mongoose.connect('mongodb://'+DB_USERNAME+':'+DB_PASSWORD+'@ds251894.mlab.com:51894/reading-club', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


// create schema
var UserSchema = new mongoose.Schema({
	_id: String,
	name: String,
	username: String,
	password: String,
	total_pages: Number,
	books_read: [{book_name: String, book_author: String}],
	progress: [{b_name: String, p_read: Number, positive: String, date: String}], //	progress: [{book_name: String, page_read_today: Number, one_positive_thing: String, date: String}],
	friends: [{_id: String, name: String}]
})

var ProgressSchema = new mongoose.Schema({
	username: String, // who is reading the book
	b_name: String,
	p_read: Number,
	positive: String,
	date: String
})

var UserModel = mongoose.model('User', UserSchema)
var ProgressModel = mongoose.model('Progress', ProgressSchema)

module.exports = {mongoose, UserModel, ProgressModel}