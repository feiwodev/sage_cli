"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReprintLog {
}
exports.ReprintLog = ReprintLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ReprintLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ticketNo: {
            type: dataTypes.STRING(50)
        },
        maker: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        lastTime: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        reprintReason: {
            type: dataTypes.STRING(50)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
