
const { Op } = require("sequelize");
let db = require("../models");
const groupWithMembers = require("../services/groupWithMembers");
const createOneToOneGroup = require("../services/createOneToOneGroup");
const { resFound, resServerError, resErrorOccured } = require("../services/responses");
const sendMessage = async (req, res) => {
    try {
        let COTOG = await createOneToOneGroup(req.body.receiverUserId, req.user.userId)
        let requestBody = {
            description: req.body.description,
            receiverUserId: req.body.receiverUserId,
            senderUserId: req.user.userId,
            groupId: COTOG
        }
        await db.message.create(requestBody);
        return resFound(req, res, "Message Sent")
    } catch (error) {
        console.log(error)
        return resServerError(req, res, error)
    }
}
const likeMessage = async (req, res) => {
    try {
        await db.message.increment(likeCount, { where: { messageId: req.query.messageId } });
        return resFound(req, res, "Message Sent")
    } catch (error) {
        return resServerError(req, res, error)
    }
}
const readMessage = async (req, res) => {
    try {
        await db.message.update({ readFlag: true }, { where: { userId: req.query.userId } });
        return resFound(req, res, "Message Read")
    } catch (error) {
        return resServerError(req, res, error)
    }
}

const createGroup = async (req, res) => {
    try {
        await groupWithMembers(req.body.name, req.body.groupDescription, req.body.members)
        return resFound(req, res, "Groups with Members Created")
    } catch (error) {
        return resServerError(req, res, error)
    }
}
const getMessages = async (req, res) => {
    try {
        let allMessages = await db.groups.findAll({
            include: [{
                model: db.groupMembers,
                as: 'groupMembers',
                where: {
                    userId: req.user.userId
                },
                required: true,
            }, {
                model: db.message,
                as: 'message',
                attributes: ['description', 'messageId', 'receiverUserId', 'senderUserId', 'readFlag', 'likeCount'],
                include: [{
                    model: db.users,
                    as: 'userSend',
                    attributes: ['userId', 'userName']
                }, {
                    model: db.users,
                    as: 'userReceive',
                    attributes: ['userId', 'userName']
                }]
            }]
        })
        return resFound(req, res, allMessages)
    } catch (error) {
        console.log(error)
        return resServerError(req, res, error)
    }
}

const adminAllMessages = async (req, res) => {
    try {
        if (!req.user.adminFlag) return resErrorOccured(req, res, "You are not admin")
        let allMessages = await db.groups.findAll({
            include: [{
                model: db.groupMembers,
                as: 'groupMembers',
                required: true,
            }, {
                model: db.message,
                as: 'message',
                attributes: ['description', 'messageId', 'receiverUserId', 'senderUserId', 'readFlag', 'likeCount'],
                include: [{
                    model: db.users,
                    as: 'userSend',
                    attributes: ['userId', 'userName']
                }, {
                    model: db.users,
                    as: 'userReceive',
                    attributes: ['userId', 'userName']
                }]
            }]
        })
        return resFound(req, res, allMessages)
    } catch (error) {
        console.log(error)
        return resServerError(req, res, error)
    }
}


module.exports = {
    sendMessage,
    likeMessage,
    readMessage,
    createGroup,
    getMessages,
    adminAllMessages
}