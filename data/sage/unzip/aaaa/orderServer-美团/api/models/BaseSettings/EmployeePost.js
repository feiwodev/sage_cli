"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeePost {
}
exports.EmployeePost = EmployeePost;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EmployeePost', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        postId: {
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
