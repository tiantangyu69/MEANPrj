var CommonDao = require('./CommonDao');
var UserSchema = require('../model/UserSchema');

var UserDao = new CommonDao(UserSchema);

module.exports = UserDao;
