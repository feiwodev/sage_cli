"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginRecordLog {
}
exports.LoginRecordLog = LoginRecordLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('LoginRecordLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employeeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        uniqueCode: {
            type: dataTypes.STRING(20)
        },
        loginDate: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
