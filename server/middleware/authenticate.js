// check if user is login or not
module.exports = function(req, res, next) {
	if(!req.session.username) {
		req.session.destroy();
		res.redirect("/enter")
	} else {
		next();
	}
}