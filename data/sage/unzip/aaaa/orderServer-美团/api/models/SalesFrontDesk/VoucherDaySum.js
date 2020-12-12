"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherDaySum {
}
exports.VoucherDaySum = VoucherDaySum;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherDaySum', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        areaId: {
            type: dataTypes.INTEGER
        },
        salesSiteId: {
            type: dataTypes.INTEGER
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        postId: {
            type: dataTypes.INTEGER
        },
        departmentId: {
            type: dataTypes.INTEGER
        },
        employeeId: {
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        businessId: {
            type: dataTypes.INTEGER
        },
        salesSchemeId: {
            type: dataTypes.INTEGER
        },
        settlementId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        touristsAddressId: {
            type: dataTypes.INTEGER
        },
        channelId: {
            type: dataTypes.INTEGER
        },
        customerId: {
            type: dataTypes.INTEGER
        },
        managerId: {
            type: dataTypes.INTEGER
        },
        guideId: {
            type: dataTypes.INTEGER
        },
        crowdKindId: {
            type: dataTypes.INTEGER
        },
        priceId: {
            type: dataTypes.INTEGER
        },
        settlementCategoryId: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.FLOAT
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        },
        ticketNumber: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
