"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function sha1(str) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(str, 'utf8');
    return sha1.digest('hex');
}
exports.sha1 = sha1;
function hmac_sha1(str, secret) {
    const hmac = crypto.createHmac('sha1', secret);
    hmac.update(str, 'utf8');
    return hmac.digest('base64');
}
exports.hmac_sha1 = hmac_sha1;
