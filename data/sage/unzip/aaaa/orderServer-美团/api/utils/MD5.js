"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function md5(str) {
    const md5 = crypto.createHash('md5');
    md5.update(str, 'utf8');
    return md5.digest('hex');
}
exports.default = md5;
