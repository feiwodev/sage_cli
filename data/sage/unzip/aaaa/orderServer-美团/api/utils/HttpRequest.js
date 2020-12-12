"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URL = require("url");
const https = require("https");
const request = require("request");
function httpGet(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'GET'
        }, (err, response, body) => {
            if (err) {
                return reject(err);
            }
            resolve(body);
        });
    });
}
exports.httpGet = httpGet;
function httpsGet(url) {
    return new Promise((resolve, reject) => {
        const parsedUrl = URL.parse(url);
        const req = https.request({
            host: parsedUrl.host,
            port: 443,
            path: parsedUrl.path,
            method: 'GET'
        }, (res) => {
            let content = '';
            res.on('data', (chunk) => {
                content += chunk;
            });
            res.on('end', () => {
                resolve(content);
            });
        });
        req.on('error', function (e) {
            reject(e);
        });
        req.end();
    });
}
exports.httpsGet = httpsGet;
function httpPost(url, data, options, headers) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'POST',
            json: data,
            headers: headers || null
        }, (err, response, body) => {
            if (err) {
                return reject(err);
            }
            resolve(body);
        });
    });
}
exports.httpPost = httpPost;
function httpsPost(url, data, options, headers) {
    return new Promise((resolve, reject) => {
        const parsedUrl = URL.parse(url);
        const req = https.request({
            host: parsedUrl.host,
            port: 443,
            path: parsedUrl.path,
            pfx: options ? (options.pfx || '') : '',
            passphrase: options ? (options.passphrase || '') : '',
            method: 'POST',
            headers: headers || null
        }, (res) => {
            let content = '';
            res.on('data', (chunk) => {
                content += chunk;
            });
            res.on('end', () => {
                resolve(content);
            });
        });
        req.on('error', function (e) {
            reject(e);
        });
        req.write(data);
        req.end();
    });
}
exports.httpsPost = httpsPost;
