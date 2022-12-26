const { Op } = require("sequelize");
const db = require("../models");
const groupWithMembers = require("./groupWithMembers");

module.exports = async (receiverId, senderId) => {
    let groupName = await getGroupName(receiverId, senderId)
    let checkIfExists = await db.groups.findOne({
        where: {
            [Op.or]: [
                { name: groupName[0] },
                { name: groupName[1] }
            ]
        },
        include: [{
            where: {
                userId: { [Op.in]: [receiverId, senderId] }
            },
            model: db.groupMembers,
            as: 'groupMembers',
            required: true
        }],
    });
    let gId;
    if (!checkIfExists) {
        gId = await groupWithMembers(groupName, 'One to One Group', [receiverId, senderId])
    } else {
        gId = checkIfExists.groupId
    }
    return gId
}

async function getGroupName(receiverId, senderId) {
    let senderName = await findByUserId(receiverId);
    let receiverName = await findByUserId(senderId);
    return [`${senderName.userName} with ${receiverName.userName}`, `${receiverName.userName} with ${senderName.userName}`]
}

async function findByUserId(id) {
    return db.users.findByPk(id, {
        attributes: ['userName']
    });
}