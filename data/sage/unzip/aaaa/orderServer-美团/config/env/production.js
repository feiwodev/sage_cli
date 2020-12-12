"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpPort = Number.parseInt(process.env.PORT) || 8086;
const tcpPort = Number.parseInt(process.env.TCPPORT) || 8806;
const wsPort = Number.parseInt(process.env.WSPORT) || 3806;
exports.default = {
    http: {
        port: httpPort,
        hostName: process.env.HOST_NAME || 'localhost',
        hostIP: process.env.HOST_IP || '127.0.0.1',
        serveStatic: process.env.SERVE_STATIC || false,
        maxCache: process.env.MAX_CACHE || 3600,
        secretKeyBase: process.env.SECRET_KEY_BASE || '',
        isEnable: process.env.HTTP_ENABLE,
        provider: process.env.HTTP_PROVIDER
    },
    ws: {
        wsPort: wsPort,
        isEnable: process.env.WS_ENABLE || false
    },
    tcp: {
        port: tcpPort,
        isEnable: process.env.TCP_ENABLE || false,
        provider: process.env.TCP_PROVIDER || ''
    }
};
