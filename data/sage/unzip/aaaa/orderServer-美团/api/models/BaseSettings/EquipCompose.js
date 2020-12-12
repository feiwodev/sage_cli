"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EquipCompose {
}
exports.EquipCompose = EquipCompose;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EquipCompose', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        equipId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        equipSubId: {
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
