"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");
const config_1 = require("../../config/config");
function generateQRCode(ticketNo) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(path.join(process.cwd(), '/public/assets/images/qrcode/'))) {
            fs.mkdirSync(path.join(process.cwd(), '/public/assets/images/qrcode/'));
        }
        qrcode.toFile(path.join(process.cwd(), '/public/assets/images/qrcode', ticketNo + '.png'), ticketNo, {
            color: {
                dark: '#000',
                light: '#fff'
            },
            scale: 10
        }, (error) => {
            let qrcodePath = '';
            if (!error) {
                qrcodePath = (config_1.config.http.hostName.indexOf('http://') >= 0 ? config_1.config.http.hostName : 'http://' + config_1.config.http.hostName) + '/assets/images/qrcode/' + ticketNo + '.png';
            }
            else {
                console.error(error);
            }
            resolve(qrcodePath);
        });
    });
}
exports.generateQRCode = generateQRCode;
;
