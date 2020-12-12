"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ERRORS = {
    invalidSign: {
        code: '1000',
        message: '无效的签名'
    },
    notTraderNumber: {
        code: '1001',
        message: '订单号不能为空'
    },
    notProductId: {
        code: '1002',
        message: '产品Id不能为空'
    },
    notQuantity: {
        code: '1003',
        message: '数量不能为空'
    },
    notChannelName: {
        code: '1004',
        message: '渠道名称不能为空'
    },
    notContactName: {
        code: '1005',
        message: '联系人名称不能为空'
    },
    notCustomerName: {
        code: '1006',
        message: '客户名称不能为空'
    },
    notGuideName: {
        code: '1007',
        message: '导游名称不能为空'
    },
    notIdCard: {
        code: '1008',
        message: '证件号码不能为空'
    },
    notPhone: {
        code: '1009',
        message: '联系电话不能为空'
    },
    notProduct: {
        code: '1010',
        message: '产品不存在'
    },
    notProductWithTeam: {
        code: '1011',
        message: '不是有效的团队产品'
    },
    notProductWithTourist: {
        code: '1012',
        message: '不是有效的散客产品'
    },
    orderExisted: {
        code: '1013',
        message: '订单已存在'
    },
    orderCanceled: {
        code: '1014',
        message: '订单已取消'
    },
    orderUsed: {
        code: '1015',
        message: '订单已使用'
    },
    orderExpired: {
        code: '1016',
        message: '订单已过期'
    },
    useDateModifyFail: {
        code: '1017',
        message: '游玩时间修改失败'
    },
    orderInfoModifyFail: {
        code: '1018',
        message: '订单信息修改失败'
    },
    orderAchieveTicketFail: {
        code: '1019',
        message: '订单出票失败'
    },
    orderRefundTicketFail: {
        code: '1020',
        message: '订单退票失败'
    },
    orderNoExisted: {
        code: '1021',
        message: '订单不存在'
    },
    orderClosed: {
        code: '1022',
        message: '订单已关闭'
    }
};
