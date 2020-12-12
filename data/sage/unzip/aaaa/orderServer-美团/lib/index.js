"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const mount = require("roas-mount");
const KoaRouter = require("koa-router");
const router_1 = require("./router");
const config_1 = require("../config/config");
let provider = config_1.config.http.provider || '';
global['$controllers'] = mount(path.join(__dirname, '../', 'api/controllers', provider));
const koaRouter = new KoaRouter();
function default_1(ctx) {
    const routes = router_1.router.getRouter();
    Object.keys(routes).forEach((url) => {
        routes[url].forEach((object) => {
            if (ctx && object.httpMethod === 'ws') {
                const instance = new object.constructor(ctx);
                ctx.socket.on((object.constructor.url || '') + url, instance[object.handler]);
            }
            else if (object.httpMethod !== 'ws') {
                koaRouter[object.httpMethod]((object.constructor.url || '') + url, async (ctx) => {
                    const instance = new object.constructor(ctx);
                    await instance[object.handler]();
                });
            }
        });
    });
    return koaRouter;
}
exports.default = default_1;
