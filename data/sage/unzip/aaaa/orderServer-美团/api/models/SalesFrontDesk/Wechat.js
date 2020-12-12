"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wechat {
}
exports.Wechat = Wechat;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Wechat', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        openId: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        accessToken: {
            type: dataTypes.STRING(110),
            allowNull: false
        },
        refreshToken: {
            type: dataTypes.STRING(110),
            allowNull: false
        },
        expiresIn: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        unionId: {
            type: dataTypes.STRING(50)
        },
        nickName: {
            type: dataTypes.STRING(50)
        },
        sex: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
        },
        province: {
            type: dataTypes.STRING(50)
        },
        city: {
            type: dataTypes.STRING(50)
        },
        country: {
            type: dataTypes.STRING(50)
        },
        headImgUrl: {
            type: dataTypes.STRING(100)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
