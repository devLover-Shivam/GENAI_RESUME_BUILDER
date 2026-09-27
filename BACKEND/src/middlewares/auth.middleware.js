const jwt = require("jsonwebtoken");

const tokenBlacklistModel = require("../models/blacklist.model");

// Middleware accepts 3 parameters: request, response and next
async function authUser(req, res, next) {

    // First, receive the token from the cookie
    const token = req.cookies.token;

    // If the token is not received, stop the request here
    if (!token) {
        return res.status(401).json({
            message: "Token Not Received!"
        });
    }

    // Check whether the received token is blacklisted or not
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    // If the token is blacklisted, do not allow the user to proceed
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is Invalid."
        });
    }

    // Verify the token using the secret key and decode the user details
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        // Store the decoded user details inside the request object
        // so that the controller can access them using req.user
        req.user = decoded;

        // next() forwards the request to the next middleware or controller
        next();

    } catch (err) {

        // If the token is invalid or expired, stop the request
        return res.status(401).json({
            message: "Invalid Token or Token is Expired"
        });
    }
}

module.exports = { authUser };