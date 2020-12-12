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
        serveStatic: true,
        maxCache: 3600,
        secretKeyBase: 'b90321d802cf09ef688b05eb6337efc3422b4e25fe42a311bc4e5ffb268c335590be89f464d3adabfbcfae4b431a5029ad6486bce777caa962d75a18322ea123',
        isEnable: true
    },
    ws: {
        wsPort: wsPort,
        isEnable: process.env.WS_ENABLE || false
    },
    tcp: {
        port: tcpPort,
        isEnable: process.env.TCP_ENABLE || false,
        provider: 'User'
    }
};
