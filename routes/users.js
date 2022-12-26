const user = require("../controller/users"); 
const routes = require("express").Router();

routes.post("/signUp",user.verifyToken, user.signUp);
routes.post("/updateUser", user.verifyToken, user.updateUser)
routes.post("/getAllActiveUsers", user.verifyToken, user.getAllActiveUsers)
routes.post("/loginUser", user.loginUser)
module.exports = routes;