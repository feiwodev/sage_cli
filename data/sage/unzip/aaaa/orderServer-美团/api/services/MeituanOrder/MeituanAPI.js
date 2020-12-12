"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../../middleware/log");
const HttpRequest_1 = require("../../utils/HttpRequest");
const sha1 = require("../../utils/SHA1");
const moment = require("moment");
const meituan_config_1 = require("../../../config/meituan_config");
class MeituanAPI {
    constructor() {
        this.partnerId = '';
        this.clientId = '';
        this.clientSecret = '';
        this.url = '';
        this.partnerId = meituan_config_1.default.partnerId;
        this.clientId = meituan_config_1.default.clientId;
        this.clientSecret = meituan_config_1.default.clientSecret;
        this.url = meituan_config_1.default.url;
    }
    async request(uri, data) {
        try {
            const url = this.url + uri;
            const date = moment.utc(new Date()).toDate();
            const dateGMTString = date.toGMTString();
            const authorization = this.buildSign('POST', uri, dateGMTString);
            const header = {
                'Content-Type': 'application/json; charset=utf-8',
                'Date': dateGMTString,
                'PartnerId': this.partnerId,
                'Authorization': authorization
            };
            const result = await HttpRequest_1.httpPost(url, data, null, header);
            if (result) {
                return result;
            }
            return null;
        }
        catch (error) {
            log_1.logger.error('请求美团接口异常');
            log_1.logger.error(error);
        }
    }
    validSign(request) {
        const header = request.header;
        if (header.authorization === this.buildSign(request.method, request.path, header.date)) {
            return true;
        }
        return false;
    }
    buildSign(method, uri, date) {
        const signStr = method + ' ' + uri + '\n' + date;
        const signature = sha1.hmac_sha1(signStr, this.clientSecret);
        const authorization = 'MWS' + ' ' + this.clientId + ':' + signature;
        return authorization;
    }
}
exports.MeituanAPI = MeituanAPI;
