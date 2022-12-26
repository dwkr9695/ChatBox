"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {

        static associate(models) {

        }
    }
    users.init(
        {
            userId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            firstName: { type: DataTypes.STRING(50) },
            lastName: { type: DataTypes.STRING(50) },
            userName: { type: DataTypes.STRING(50) },
            gender: { type: DataTypes.STRING(8) },
            emailAddress: { type: DataTypes.STRING(50) },
            password: { type: DataTypes.STRING(100) },
            adminFlag: { type: DataTypes.BOOLEAN },
            activeFlag: { type: DataTypes.BOOLEAN },
            mobileNumber: { type: DataTypes.INTEGER },
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "users",
        }
    );
    return users;
};
