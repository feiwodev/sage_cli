"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerCard {
}
exports.CustomerCard = CustomerCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CustomerCard', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerId: {
            type: dataTypes.INTEGER
        },
        issuedCardId: {
            type: dataTypes.INTEGER
        },
        managerId: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
