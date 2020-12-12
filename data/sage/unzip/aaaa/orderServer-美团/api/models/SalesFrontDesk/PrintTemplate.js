"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintTemplate {
}
exports.PrintTemplate = PrintTemplate;
function default_1(sequelize, dataTypes) {
    return sequelize.define('PrintTemplate', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        template: {
            type: dataTypes.TEXT
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
