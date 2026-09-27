const {Router} = require('express');
const authController = require("../controllers/auth.controller");
const authRouter = Router();
const authMiddleware = require("../middlewares/auth.middleware")



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

/** 
 * @route GET/API/AUTH/GET-ME
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);

module.exports = authRouter;