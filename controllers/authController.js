const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const handleErrors = (err) => {
    let errors = { email: '', username: '', password: ''};

    //duplicate username during sign up, email checked manually
    if(err.code === 11000){
        errors.username = 'Username already taken';
        return errors;
    }

    //validation errors via user model during signup
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//create a JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, username, password } = req.body;
    try{

        //first check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ 
                errors: { 
                    email: 'Email already registered',
                    username: '',
                    password: ''
                }
            });
        }

        const user = await User.create({ email, username, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });

        //send json to the dashboard page we want to redirect to?
        res.status(201).json({ 
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
    
}

module.exports.login_post = (req, res) => {

}

module.exports.logout_get = (req, res) => {

}