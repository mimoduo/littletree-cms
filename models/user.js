var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 7
	}
});

userSchema.pre('save', function (next) {
	var user = this;

	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}

		user.password = hash;

		next();
	});
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);