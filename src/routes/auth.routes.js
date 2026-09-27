const {Router} = require('express');

const authRouter = Router();


/** 
 * @route POST/API/AUTH/REGISTER
 * @description Register a new user
 * @access Public 
 */
authRouter.post("/register",(req,res)=>{
    res.send("Register Route");
})

module.exports = authRouter;