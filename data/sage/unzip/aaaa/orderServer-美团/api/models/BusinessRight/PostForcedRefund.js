"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostForcedRefund {
}
exports.PostForcedRefund = PostForcedRefund;
function default_1(sequelize, dataTypes) {
    return sequelize.define('PostForcedRefund', {
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
