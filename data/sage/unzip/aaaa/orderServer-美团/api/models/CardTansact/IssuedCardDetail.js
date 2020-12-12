"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssuedCardDetail {
}
exports.IssuedCardDetail = IssuedCardDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IssuedCardDetail', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        issuedCardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        accessSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        lastCheckDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        recentCheckDir: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        passTimes: {
            type: dataTypes.INTEGER
        },
        passedTimes: {
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
