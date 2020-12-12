"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeCard {
}
exports.EmployeeCard = EmployeeCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EmployeeCard', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employeeId: {
            type: dataTypes.INTEGER
        },
        issuedCardId: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
