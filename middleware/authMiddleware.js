const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

module.exports = { requireAuth }