"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            userId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, initialAutoIncrement: 10000 },
            firstName: { type: Sequelize.STRING(50) },
            lastName: { type: Sequelize.STRING(50) },
            userName: { type: Sequelize.STRING(50) },
            gender: { type: Sequelize.STRING(8) },
            emailAddress: { type: Sequelize.STRING(50) },
            password: { type: Sequelize.STRING(100) },
            adminFlag: { type: Sequelize.BOOLEAN },
            activeFlag: { type: Sequelize.BOOLEAN },
            mobileNumber: { type: Sequelize.INTEGER },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        }, {
            initialAutoIncrement: 10000
        });
        await queryInterface.createTable("messages", {
            messageId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, initialAutoIncrement: 20000 },
            description: { type: Sequelize.STRING },
            receiverUserId: { type: Sequelize.STRING(15) },
            senderUserId: { type: Sequelize.STRING(15) },
            readFlag: { type: Sequelize.BOOLEAN },
            groupId: { type: Sequelize.STRING(15) },
            likeCount: { type: Sequelize.INTEGER },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        }, {
            initialAutoIncrement: 20000
        });
        await queryInterface.createTable("groups", {
            groupId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, initialAutoIncrement: 30000 },
            name: { type: Sequelize.STRING(100) },
            groupDescription: { type: Sequelize.STRING },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        }, {
            initialAutoIncrement: 30000
        });
        await queryInterface.createTable("groupMembers", {
            groupMemberId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, initialAutoIncrement: 40000 },
            userId: { type: Sequelize.STRING(15) },
            groupId: { type: Sequelize.STRING(15) },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        }, {
            initialAutoIncrement: 40000
        });
    },
};
