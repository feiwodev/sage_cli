"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../middleware/log");
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PATCH"] = "patch";
    HttpMethod["DELETE"] = "delete";
    HttpMethod["OPTIONS"] = "options";
    HttpMethod["PUT"] = "put";
    HttpMethod["WS"] = "ws";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
class Router {
    constructor() {
        this.router = {};
    }
    setRouter(url, routerAction) {
        const _router = this.router[url];
        if (_router) {
            for (const index in _router) {
                const object = _router[index];
                if (((object.constructor.url || '') + url === url) && object.httpMethod === routerAction.httpMethod) {
                    log_1.logger.error(`路由地址 ${object.httpMethod} ${url} 已经存在`);
                    return;
                }
            }
            this.router[url].push(routerAction);
        }
        else {
            this.router[url] = [];
            this.router[url].push(routerAction);
        }
    }
    getRouter() {
        return this.router;
    }
}
exports.router = new Router();
function route(url, httpMethod) {
    return (target, propertyKey) => {
        if (typeof target === 'function') {
            target['url'] = url;
        }
        else if (propertyKey) {
            exports.router.setRouter(url, {
                httpMethod: httpMethod || HttpMethod.GET,
                constructor: target.constructor,
                handler: propertyKey
            });
        }
    };
}
exports.route = route;
