"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const config_1 = require("./config");
const logPath = path.join(config_1.appPath, '/logs');
exports.default = {
    appenders: {
        out: {
            type: 'console'
        },
        debug: {
            type: 'file',
            filename: logPath + '/out.log',
            maxLogSize: 10485760,
            pattern: '-yyyy-MM-dd',
            numBackups: 5
        },
        error: {
            type: 'file',
            filename: logPath + '/error.log',
            maxLogSize: 10485760,
            pattern: '-yyyy-MM-dd',
            numBackups: 5
        }
    },
    categories: {
        default: {
            appenders: config_1.env === 'development' ? ['out', 'debug'] : ['error'],
            level: config_1.env === 'development' ? 'debug' : 'error'
        }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
};
