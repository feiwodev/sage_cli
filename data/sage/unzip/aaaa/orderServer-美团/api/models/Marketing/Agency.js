"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Agency {
}
exports.Agency = Agency;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Agency', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        leader: {
            type: dataTypes.STRING(30)
        },
        phone: {
            type: dataTypes.STRING(20)
        },
        address: {
            type: dataTypes.STRING(200)
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
