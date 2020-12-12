"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
}
exports.Post = Post;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Post', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        categoryType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        creator: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Post_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Post_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
