"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessScheme {
}
exports.BusinessScheme = BusinessScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('BusinessScheme', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        businessTicketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isUse: {
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
