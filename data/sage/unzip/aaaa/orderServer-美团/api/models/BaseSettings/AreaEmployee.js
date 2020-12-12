"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AreaEmployee {
}
exports.AreaEmployee = AreaEmployee;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AreaEmployee', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        areaId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        employeeId: {
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
