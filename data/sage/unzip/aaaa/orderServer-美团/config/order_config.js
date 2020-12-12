"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    secret: process.env['ORDER_SECRET'] || '55af897a23890272f02c7605f11098886f0',
    notifyUrl: process.env['ORDER_NOTIFY_URL'] || 'http://demo.demo1.sjdzp.com/Api/LocalPiaowu/api.json?g_cid=76',
    notifyInterval: process.env['ORDER_NOTIFY_INTERVAl'] || 10,
    verifyMode: process.env['ORDER_VERIFY_MODE'] || 2
};
