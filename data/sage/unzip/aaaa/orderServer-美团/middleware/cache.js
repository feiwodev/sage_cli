"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const Cache = require("node-cache");
let middleOptions = {};
const prefix = middleOptions.prefix || 'roas-cache:';
const expire = middleOptions.expire || config_1.config.http.maxCache;
const nodeCache = new Cache({ stdTTL: expire, checkperiod: 120 });
const setCache = (key, value, cacheOptions) => {
    if (value == null) {
        return;
    }
    const currentOptions = cacheOptions || {};
    key = prefix + key;
    const tty = currentOptions.expire || expire;
    nodeCache.set(key, value, tty);
};
const getCache = (key) => {
    key = prefix + key;
    let data = nodeCache.get(key);
    if (data && data !== undefined) {
        return data;
    }
    return null;
};
const deleteCache = (key) => {
    key = prefix + key;
    return nodeCache.del(key);
};
exports.cache = {
    get: getCache,
    set: setCache,
    del: deleteCache
};
function default_1(options) {
    middleOptions = options || {};
    const cacheMiddle = async (ctx, next) => {
        ctx.cache = {
            get: getCache,
            set: setCache,
            del: deleteCache
        };
        await next();
    };
    return cacheMiddle;
}
exports.default = default_1;
