const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    username: {
        type: String, 
        required: [true, 'Please enter a username'],
        unique: true,
        minlength: [3, 'Minimum length of username is 3 characters'],
        maxlength: [12, 'Maximum length of username is 12 characters']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum length of password is 6 characters']
    }
});

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login the user

userSchema.statics.login = async function(emailOrUsername, password){
    const user = await this.findOne({
        $or: [
            { email: emailOrUsername.toLowerCase() },
            { username: emailOrUsername }
        ]
    });
    
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw new Error('Incorrect Password');
    }
    throw new Error('Incorrect Email or Username');
}

const User = mongoose.model('user', userSchema);

module.exports = User;