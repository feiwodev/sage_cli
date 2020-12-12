"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManagerGuide {
}
exports.ManagerGuide = ManagerGuide;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ManagerGuide', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        managerId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        guideId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        assignTime: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
