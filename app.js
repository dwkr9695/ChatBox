let path = require("path");
let fixture = path.join(__dirname, "./.env");
let dotenv = require('dotenv').config({ path: fixture })
let config = dotenv.parsed
const request = require("request");
const express = require("express");
const app = express();
const cors = require("cors");
const { verifyToken } = require("./controller/users");
const allRoutes = require("./services/allRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cors
var whiteList = config.WHITELIST;
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));
let user = require("./routes/users")
app.use("/api/v1/user", user);

let cb = require("./routes/chatBox"); 
app.use("/api/v1/chatBox", cb);

app.get("/api/v1/findAllRoutes", verifyToken, async (req, res) => {
    try {
        let stack = allRoutes(app);
        return res.status(200).send({ statusCode: 200, allAPIS: stack });
    }
    catch (error) {
        console.log(error);
    }
});

const PORT = process.env.PORT
app.listen(PORT, process.env.HOST, () => {
    console.log(`server is running on port ${PORT}`);
});
