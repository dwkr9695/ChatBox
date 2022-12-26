const db = require("../models");


module.exports = async (groupName, groupDescription = null, groupMembers = []) =>{
    let groupCreation = await db.groups.create({
        name: groupName,
        groupDescription: groupDescription,
    })
    groupMembers.forEach((x) => {
        groupMembers.push(db.groupMembers.create({
            userId: x,
            groupId: groupCreation.groupId
        }))
    });
    await Promise.all(groupMembers);
    return groupCreation.groupId
};