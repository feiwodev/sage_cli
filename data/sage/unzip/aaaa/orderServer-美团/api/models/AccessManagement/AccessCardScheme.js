"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessCardScheme {
}
exports.AccessCardScheme = AccessCardScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessCardScheme', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessCardSetId: {
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
