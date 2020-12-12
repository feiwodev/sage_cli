"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    partnerId: process.env['MEITUAN_PARTNER_ID'] || '10001187',
    clientId: process.env['MEITUAN_CLIENT_ID'] || 'lvyou_200187',
    clientSecret: process.env['MEITUAN_CLIENT_SECRET'] || '3544bf4f63f9f0e043393650b8c89361',
    url: process.env['MEITUAN_URL'] || 'https://seine.test.meituan.com',
    payNotifyUrl: process.env['MEITUAN_PAY_NOTIFY_URL'] || '/sandbox/api/dispatch/order/pay/notice',
    refundNotifyUrl: process.env['MEITUAN_REFUND_NOTIFY_URL'] || '/sandbox/api/dispatch/order/refund/notice',
    consumeNotifyUrl: process.env['MEITUAN_CONSUME_NOTIFY_URL'] || '/sandbox/api/dispatch/order/consume/notice',
    notifyInterval: process.env['MEITUAN_NOTIFY_INTERVAl'] || 10
};
