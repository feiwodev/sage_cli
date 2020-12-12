"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrowdKindHint {
}
exports.CrowdKindHint = CrowdKindHint;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CrowdKindHint', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        crowdKindId: {
            type: dataTypes.INTEGER
        },
        voiceFile: {
            type: dataTypes.STRING(512)
        },
        textMsg: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
