"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostRight {
}
exports.PostRight = PostRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('PostRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        postId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessPriceId: {
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
