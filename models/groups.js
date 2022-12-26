"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class groups extends Model {

        static associate(models) {

        }
    }
    groups.init(
        {
            groupId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING(100) },
            groupDescription: { type: DataTypes.STRING },
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            tableName: "groups",
            modelName: "groups",
        }
    );
    return groups;
};
