"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentPost {
}
exports.DepartmentPost = DepartmentPost;
function default_1(sequelize, dataTypes) {
    return sequelize.define('DepartmentPost', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        departmentId: {
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
