"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReprintRight {
}
exports.ReprintRight = ReprintRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ReprintRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        postId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        exceptionHandlingId: {
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
