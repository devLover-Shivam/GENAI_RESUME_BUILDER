const {Router} = require('express');
const authController = require("../controllers/auth.controller");
const authRouter = Router();




/** 
 * @route POST/API/AUTH/REGISTER
 * @description Register a new user, expects username,email and password in the required field
 * @access Public 
 */
authRouter.post("/register",authController.registerUserController);

/** 
 * @route POST/API/AUTH/LOGIN
 * @description Login a exisitng user, expects username,email and password in the required field
 * @access Public 
 */
authRouter.post("/login",authController.loginUserController);

/** 
 * @route GET/API/AUTH/LOGOUT
 * @description Clear token from user cookie and add the token in blacklist
 * @access Public 
 */

authRouter.get("/logout",authController.logoutUserController);

module.exports = authRouter;