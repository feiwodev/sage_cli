"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const convert = require("koa-convert");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const config_1 = require("./config/config");
const models_1 = require("./api/models");
const lib_1 = require("./lib");
const cache_1 = require("./middleware/cache");
const xload_1 = require("./middleware/xload");
const RestQL = require("roas-restql");
const cors = require("koa-cors");
const log_1 = require("./middleware/log");
const path = require("path");
const http = require("http");
const Net = require("net");
const IO = require("koa-socket.io");
const app = new Koa();
const io = new IO({
    namespace: '/'
});
app.keys = [config_1.config.http.secretKeyBase];
if (config_1.config.http.serveStatic) {
    app.use(convert(require('koa-static')(path.join(process.cwd(), '/public'))));
}
app.use(xload_1.default(app, {
    path: path.join(process.cwd(), '/public/assets/images/avatar'),
    upload: {
        encoding: 'utf-8',
        maxFieldsSize: 2 * 1024 * 1024,
        maxFields: 1000
    }
}));
app.use(log_1.default());
app.use(cache_1.default());
app.use(json());
app.use(bodyparser({
    formLimit: '100mb',
    jsonLimit: '100mb'
}));
app.use(cors());
app.use(lib_1.default().routes()).use(lib_1.default().allowedMethods());
const restql = new RestQL(models_1.models);
app.use(restql.routes());
if (process.argv[2] && process.argv[2][0] === 'c') {
    const repl = require('repl');
    repl.start({
        prompt: '> ',
        useGlobal: true
    }).on('exit', () => {
        process.exit();
    });
}
else {
    (async () => {
        const connection = await models_1.sequelize.sync({
            force: false
        });
        if (connection) {
            console.log('Connected to the database');
            if (config_1.config.http && config_1.config.http.isEnable) {
                app.listen(config_1.config.http.port, () => {
                    console.log('http server listener port:' + config_1.config.http.port);
                });
            }
            if (config_1.config.ws && config_1.config.ws.isEnable) {
                const wsServer = http.createServer(app.callback());
                wsServer.listen(config_1.config.ws.wsPort, 'localhost', () => {
                    console.log('web socket server listener port:' + config_1.config.ws.wsPort);
                });
                io.start(wsServer);
                io.use((ctx, next) => {
                    ctx.body = ctx.data;
                    lib_1.default(ctx);
                });
            }
            if (config_1.config.tcp && config_1.config.tcp.isEnable && config_1.config.tcp.provider) {
                const socketServer = Net.createServer((socket) => {
                    socket.on('data', async (data) => {
                        let parser = require('./api/parsers/' + config_1.config.tcp.provider);
                        await parser.execute(socket, data.toString());
                    });
                });
                socketServer.listen(config_1.config.tcp.port, () => {
                    console.info('socket server listener port: ' + config_1.config.tcp.port);
                });
            }
        }
    })();
}
exports.default = app;
