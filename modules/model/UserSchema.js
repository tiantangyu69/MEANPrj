var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, default: '匿名用户'},
    password: {type: String, default: '111111'},
    age: Number,
    birthday: {type: Date, default: Date.now()}
});

var user = mongoose.model('user', userSchema);

module.exports = user;
