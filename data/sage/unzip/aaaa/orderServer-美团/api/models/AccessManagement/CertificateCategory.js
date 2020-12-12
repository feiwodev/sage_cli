"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CertificateCategory {
}
exports.CertificateCategory = CertificateCategory;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CertificateCategory', {
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
            type: dataTypes.STRING(30),
            allowNull: false
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
