var crypto = require('crypto');
var mongoose = require('./connect');


var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
}, {
    collection: 'users'
});

var userModel = mongoose.model('User', userSchema);


function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};



//存储用户信息
User.prototype.save = function(callback) {
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex');
    //要存入数据库的用户信息文档
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };

    var newUser = new userModel(user);
    newUser.save(function(err, user){
      if (err) {
        return callback(err);
      }
      callback(null,user);
    })
};

//读取用户信息
User.prototype.get = function(name, callback) {
    userModel.findOne({name:name},function(err,user){
      if (err) {
        return callback(err);
      }
      callback(null, user)
    })
};

module.exports = User;
