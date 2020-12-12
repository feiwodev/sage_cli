"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeDuty {
}
exports.EmployeeDuty = EmployeeDuty;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EmployeeDuty', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        dutyId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isInquire: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        isManage: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        isDisable: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
