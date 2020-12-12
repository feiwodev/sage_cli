"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toQueryString(object) {
    return Object.keys(object).filter(function (key) {
        return object[key] !== undefined && object[key] !== '';
    }).sort().map(function (key) {
        return key + '=' + object[key];
    }).join('&');
}
exports.toQueryString = toQueryString;
