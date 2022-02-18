 //Verify token middleware
 const jwt = require('jsonwebtoken');

 const verifyUserToken = (req, res, next) => {
     const userToken = req.headers.token
     if (userToken) {
         const token = userToken.split(" ")[1]
         jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
             if (err) {
                 res.status(403).json('Invalid token')
                 return
             }
             req.user = user
             next()
         })
     } else {
         res.status(401).send('You are not authinticated!')
     }
 }
 module.exports = { verifyUserToken }