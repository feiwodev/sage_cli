"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeRight {
}
exports.EmployeeRight = EmployeeRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EmployeeRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessPriceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
