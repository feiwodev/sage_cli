"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InquiryScheme {
}
exports.InquiryScheme = InquiryScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('InquiryScheme', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reportModuleId: {
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(50)
        },
        dateType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        filter: {
            type: dataTypes.TEXT
        },
        aggregate: {
            type: dataTypes.STRING(255)
        },
        field: {
            type: dataTypes.TEXT
        },
        user: {
            type: dataTypes.INTEGER
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
