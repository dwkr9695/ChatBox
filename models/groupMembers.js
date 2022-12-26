"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class groupMembers extends Model {

        static associate(models) {

        }
    }
    groupMembers.init(
        {
            groupMemberId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            userId: { type: DataTypes.STRING(15) },
            groupId: { type: DataTypes.STRING(15) },
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            tableName: "groupMembers",
            modelName: "groupMembers",
        }
    );
    return groupMembers;
};
