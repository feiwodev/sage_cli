"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WinPaperBalance {
}
exports.WinPaperBalance = WinPaperBalance;
function default_1(sequelize, dataTypes) {
    return sequelize.define('WinPaperBalance', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
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
