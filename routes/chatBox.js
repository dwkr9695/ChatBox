const cb = require("../controller/chatBox")
const routes = require("express").Router();
const { verifyToken } = require("../controller/users");
routes.post("/createGroup", verifyToken, cb.createGroup);
routes.post("/sendMessage", verifyToken, cb.sendMessage)
routes.post("/readMessage", verifyToken, cb.readMessage)
routes.post("/likeMessage", verifyToken, cb.likeMessage)
routes.get("/adminAllMessages", verifyToken, cb.adminAllMessages)
routes.get("/getMessages", verifyToken, cb.getMessages)
module.exports = routes;