"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Voucher {
}
exports.Voucher = Voucher;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Voucher', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        number: {
            type: dataTypes.STRING(30)
        },
        timeInterval: {
            type: dataTypes.INTEGER
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
        },
        maker: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        areaId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        businessId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        touristsAddressId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        channelId: {
            type: dataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        customerId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        managerId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        guideId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        settlementId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        settlementCardId: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        forcedRefundId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        receivable: {
            type: dataTypes.FLOAT
        },
        paid: {
            type: dataTypes.FLOAT
        },
        change: {
            type: dataTypes.FLOAT
        },
        printInvoice: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        handler: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        payeer: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        auditor: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        auditTime: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        isPay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isPayee: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        state: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isClassEnd: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isLocal: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Voucher_Number',
                fields: ['number']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
