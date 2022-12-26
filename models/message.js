"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class messages extends Model {

        static associate(models) {

        }
    }
    messages.init(
        {
            messageId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            description: { type: DataTypes.STRING },
            receiverUserId: { type: DataTypes.STRING(15) },
            senderUserId: { type: DataTypes.STRING(15) },
            readFlag: { type: DataTypes.BOOLEAN, defaultValue : false },
            groupId: { type: DataTypes.STRING(15) },
            likeCount: { type: DataTypes.INTEGER, defaultValue : 0 },
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            tableName: "messages",
            modelName: "messages",
        }
    );
    return messages;
};
