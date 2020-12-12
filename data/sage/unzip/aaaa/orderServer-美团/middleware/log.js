"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const log_1 = require("../config/log");
log4js.configure(log_1.default);
const loggerError = log4js.getLogger('error');
const loggerDebug = log4js.getLogger('debug');
const loggerInfo = log4js.getLogger('app');
const error = (value) => {
    loggerError.error(value);
};
const debug = (value) => {
    loggerDebug.debug(value);
};
const info = (value) => {
    loggerInfo.info(value);
};
exports.logger = {
    info: info,
    debug: debug,
    error: error
};
exports.default = () => {
    const logMiddle = async (ctx, next) => {
        try {
            ctx.log = {
                info: info,
                debug: debug,
                error: error
            };
            await next();
        }
        catch (err) {
            error(err);
            throw err;
        }
    };
    return logMiddle;
};
