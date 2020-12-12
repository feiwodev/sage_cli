"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toJsonData(sqlData) {
    if (sqlData instanceof Array) {
        const newDataArray = [];
        for (let item of sqlData) {
            newDataArray.push(toJsonData(item));
        }
        return newDataArray;
    }
    if (sqlData instanceof Object) {
        if (sqlData && sqlData.dataValues) {
            for (let key in sqlData.dataValues) {
                sqlData.dataValues[key] = toJsonData(sqlData.dataValues[key]);
            }
            return sqlData.dataValues;
        }
    }
    return sqlData;
}
exports.toJsonData = toJsonData;
