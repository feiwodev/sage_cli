"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportEmployeeRight {
}
exports.ReportEmployeeRight = ReportEmployeeRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ReportEmployeeRight', {
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
