"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Duty {
}
exports.Duty = Duty;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Duty', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parentId: {
            type: dataTypes.INTEGER
        },
        level: {
            type: dataTypes.INTEGER
        },
        levelSeqNo: {
            type: dataTypes.INTEGER
        },
        isLeaf: {
            type: dataTypes.BOOLEAN
        },
        levelTree: {
            type: dataTypes.STRING(1024)
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        module: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        isShowImage: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        imageSrc: {
            type: dataTypes.STRING(500)
        },
        gotoPage: {
            type: dataTypes.STRING(200)
        },
        purviewType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        categoryType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Duty_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Duty_Module',
                fields: ['module']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
