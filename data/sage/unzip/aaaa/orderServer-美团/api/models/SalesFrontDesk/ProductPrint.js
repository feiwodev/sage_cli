"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductPrint {
}
exports.ProductPrint = ProductPrint;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ProductPrint', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: dataTypes.INTEGER
        },
        template: {
            type: dataTypes.TEXT
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
