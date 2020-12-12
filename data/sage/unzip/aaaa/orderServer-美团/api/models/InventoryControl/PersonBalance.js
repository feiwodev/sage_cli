"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonBalance {
}
exports.PersonBalance = PersonBalance;
function default_1(sequelize, dataTypes) {
    return sequelize.define('PersonBalance', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        receiver: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stockWayId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        startId: {
            type: dataTypes.INTEGER
        },
        endId: {
            type: dataTypes.INTEGER
        },
        startSerial: {
            type: dataTypes.STRING(20)
        },
        endSerial: {
            type: dataTypes.STRING(20)
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        costPrice: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
