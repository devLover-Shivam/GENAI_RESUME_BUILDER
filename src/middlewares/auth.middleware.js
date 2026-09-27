const jwt = require("jsonwebtoken");
//any middleware accepts 3 parameters
function authUser(req,res,next){
    //first receive the token
    const token = req.cookies.token
    //if token is received return from there
    if(!token){
        return res.status(401).json({
            message:"Token Not Received !"
        })
    }
    //if token is verified and then store the token in the decoded variable which is an industry accepted variable as the jwt.verify decodes the token and provides the details
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded
        //this next forwards the decoded details which is stored in the user property of request to the controller
        next()
    }catch(err){
        return res.status(401).json({
            message: "Invalid Token or Token is Expired"
        })
    }
}

module.exports = {authUser}