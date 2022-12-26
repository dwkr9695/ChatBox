const db = require("../models")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { trimName, passwordValidation } = require("../middleware/requestBodyValidation");
const { resDocCreated, resServerError, resDocUpdated, resFound, resErrorOccured, resNotFound } = require("../services/responses");

const signUp = async (req, res) => {
    try {
        if(!req.user.adminFlag) return res.status(203).send("You are not Admin")
        let checkIfExists = await db.users.findOne({
            where: {
                emailAddress: trimName(req.body.emailAddress),
                userName: trimName(req.body.userName),
            }
        });
        if (checkIfExists) return res.status(203).send("Email Address already taken")
        const salt = await bcrypt.genSalt(10)
        let password = passwordValidation(req.body.password)
        if (!password) return resErrorOccured(req, res, "Password Length must be greater than 7")
        let requestBody = {
            firstName: trimName(req.body.firstName),
            lastName: trimName(req.body.lastName),
            userName: trimName(req.body.userName),
            gender: trimName(req.body.gender),
            emailAddress: trimName(req.body.emailAddress),
            password: await bcrypt.hash(req.body.password, salt),
            activeFlag: true,
            adminFlag: req.body.adminFlag,
            mobileNumber: req.body.mobileNumber
        }
        await db.users.create(requestBody)
        return resDocCreated(req, res, 'User Created')
    } catch (error) {
        console.log(error)
        return resServerError(req, res, error)
    }
}

const updateUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, salt)
        await db.users.update(req.body, {
            where: {
                userId: req.query.userId
            }
        })
        return resDocUpdated(req, res, "User Updated")
    } catch (error) {
        return resServerError(req, res, error)
    }
}
const getAllActiveUsers = async (req, res) => {
    try {
        let data = await db.users.findAll({
            where: {
                activeFlag: true
            }
        });
        return resFound(req, res, data)
    } catch (error) {
        return resServerError(req, res, error)
    }
}
const loginUser = async (req, res) => {
    try {
        const user = await db.users.findOne({ where: { emailAddress: req.body.emailAddress } });
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.password);
            console.log(password_valid)
            if (password_valid) {
                token = jwt.sign({
                    "userId": user.userId, "emailAddress": user.emailAddress,
                    "firstName": user.firstName, "lastName": user.lastName, "isAdmin": user.isAdmin,
                    "password": user.password
                },
                    process.env.JWT_KEY,
                    { expiresIn: '3d' }
                );
                return resFound(req, res, token)
            } else {
                return resErrorOccured(req, res, "Password Incorrect")
            }
        } else {
            return resErrorOccured(req, res, "User does not exist")
        }
    } catch (error) {
        return resServerError(req, res, error)
    }
}
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.token;
        if (authHeader) {
            jwt.verify(authHeader, process.env.JWT_KEY, async (err, user) => {
                if (err) {
                    return resErrorOccured(req, res, "Token Expired, Please re-generate.")
                } else {
                    let user = jwt.decode(authHeader);
                    const findUser = await db.users.findOne({
                        where: { emailAddress: user.emailAddress, activeFlag: true },
                        attributes: ['userId', 'firstName', 'lastName', 'userName', 'emailAddress', "adminFlag"]
                    })
                    if (!findUser) return resNotFound(req, res, "User Not Exists")
                    req.user = findUser;
                    next()
                }
            });
        } else {
            return resNotFound(req, res, "Token not provided...!!!")
        }
    } catch (error) {
        return resServerError(req, res, error);
    }
};
module.exports = {
    signUp,
    updateUser,
    getAllActiveUsers,
    loginUser,
    verifyToken
}