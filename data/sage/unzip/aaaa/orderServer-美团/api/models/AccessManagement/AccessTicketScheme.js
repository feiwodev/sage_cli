"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessTicketScheme {
}
exports.AccessTicketScheme = AccessTicketScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessTicketScheme', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessTicketSetId: {
            type: dataTypes.INTEGER
        },
        accessSchemeId: {
            type: dataTypes.INTEGER
        },
        priority: {
            type: dataTypes.INTEGER
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
