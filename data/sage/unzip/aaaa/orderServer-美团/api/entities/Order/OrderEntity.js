"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderVerifyMode;
(function (OrderVerifyMode) {
    OrderVerifyMode[OrderVerifyMode["\u51FA\u7968\u6838\u9500"] = 1] = "\u51FA\u7968\u6838\u9500";
    OrderVerifyMode[OrderVerifyMode["\u68C0\u7968\u6838\u9500"] = 2] = "\u68C0\u7968\u6838\u9500";
})(OrderVerifyMode = exports.OrderVerifyMode || (exports.OrderVerifyMode = {}));
class OrderEntity {
    constructor() {
        this.isPay = true;
        this.type = 0;
        this.status = 0;
        this.verifyMode = 1;
    }
}
exports.OrderEntity = OrderEntity;
