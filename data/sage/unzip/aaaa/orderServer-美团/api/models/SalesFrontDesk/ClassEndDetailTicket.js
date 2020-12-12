"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassEndDetailTicket {
}
exports.ClassEndDetailTicket = ClassEndDetailTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ClassEndDetailTicket', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classEndDetailId: {
            type: dataTypes.INTEGER
        },
        startSerial: {
            type: dataTypes.STRING(30)
        },
        endSerial: {
            type: dataTypes.STRING(30)
        },
        startId: {
            type: dataTypes.INTEGER
        },
        endId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
