"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeForcedRefund {
}
exports.EmployeeForcedRefund = EmployeeForcedRefund;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EmployeeForcedRefund', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        forcedRefundId: {
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
