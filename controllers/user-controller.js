var User = require('../models/user.js');
const { body, validationResult } = require('express-validator/check'); 

exports.createUserGet = function(req, res) {

	User.find({}, function(err, users) {
		res.render('sign-up', {
			title: 'Sign Up',
			users: users
		});
	});
};

exports.createUserPost = [
	body('username')
		.isEmail().withMessage('Username must be an email')
		.normalizeEmail(),
	body('password')
		.isLength({ 
			min: 7
		}).withMessage('Password must be at least 7 characters'),
	function(req, res) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render('sign-up', {
				title: 'Sign Up',
				username: req.body.username,
				errors: errors.array()
			});
		} else {
			User.create({
				username: req.body.username,
				password: req.body.password
			}).then(function(item) {
				res.redirect('/');
			}).catch(function(err) {
				res.render('sign-up', {
					title: 'Sign Up',
					username: req.body.username,
					errors: [{
						msg: "Username must be unique"
					}]
				});
			});
		}
	}
];