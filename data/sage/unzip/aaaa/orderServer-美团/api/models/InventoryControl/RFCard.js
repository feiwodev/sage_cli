"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RFCard {
}
exports.RFCard = RFCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('RFCard', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        seqNo: {
            type: dataTypes.STRING(20)
        },
        uniqueId: {
            type: dataTypes.STRING(50)
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
