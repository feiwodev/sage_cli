"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsumeTypeLog {
}
exports.ConsumeTypeLog = ConsumeTypeLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ConsumeTypeLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payeerId: {
            type: dataTypes.INTEGER
        },
        refundAmountId: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
