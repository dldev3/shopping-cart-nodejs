let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');


let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.encryptPassword =  (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    
userSchema.methods.validPassword = function (password) {
    return (bcrypt.compareSync(password, this.password));
}



module.exports = mongoose.model("User", userSchema);
