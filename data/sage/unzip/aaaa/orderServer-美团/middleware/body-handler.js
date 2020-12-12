"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(callback) {
    return async (ctx, next) => {
        try {
            await next();
            if (404 === ctx.status) {
                ctx.status = 404;
                ctx.body = '请求的路径或资源不存在';
                return true;
            }
            let data = null;
            if (ctx.body && typeof ctx.body === 'string') {
                try {
                    data = JSON.parse(ctx.body);
                }
                catch (err) {
                    data = ctx.body;
                }
            }
            ctx.body = {
                data: data,
                error: {
                    code: 0,
                    message: 'success'
                }
            };
            ctx.status = 200;
            return true;
        }
        catch (err) {
            ctx.body = {
                data: null,
                error: {
                    code: err.code || err.status || 500,
                    message: err.message || '服务发生未知错误'
                }
            };
            if (callback) {
                callback(err, ctx);
            }
            ctx.status = 200;
        }
    };
}
exports.default = default_1;
