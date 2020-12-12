"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentEmployee {
}
exports.DepartmentEmployee = DepartmentEmployee;
function default_1(sequelize, dataTypes) {
    return sequelize.define('DepartmentEmployee', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        departmentId: {
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
