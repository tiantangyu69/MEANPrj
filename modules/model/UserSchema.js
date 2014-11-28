var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String, default: '111111'},
    name: {type: String, default: '匿名用户'},
    sex: String,
    idCard: String,
    telephone: String,
    email: String,
    status: Number,
    lastLoginIP: String,
    lastLoginTime: Date,
    birthday: {type: Date, default: Date.now()},
    createDate: {type: Date, default: Date.now()}
});

var user = mongoose.model('user', userSchema);

module.exports = user;
