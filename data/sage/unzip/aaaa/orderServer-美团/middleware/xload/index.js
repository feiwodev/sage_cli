"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const formidable_1 = require("./lib/formidable");
const sendfile_1 = require("./lib/sendfile");
function default_1(app, options) {
    let dir = path.resolve(options.path || './data');
    return async function xload(ctx, next) {
        if (ctx.download) {
            return await next();
        }
        let req = ctx.req;
        let res = ctx.res;
        Object.assign(ctx, {
            upload: function (opt) {
                let config = Object.assign({
                    uploadDir: dir,
                    encoding: 'utf-8',
                    maxFieldsSize: 2 * 1024 * 1024,
                    maxFields: 1000,
                    keepExtensions: true
                }, options.upload, opt);
                return formidable_1.default(req, config);
            },
            download: function (filename, opt) {
                let config = Object.assign({
                    downloadDir: dir,
                }, options.download, opt);
                let userAgent = (ctx.get('user-agent') || '').toLowerCase();
                if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
                    ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent(filename));
                }
                else if (userAgent.indexOf('firefox') >= 0) {
                    ctx.set('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(filename) + '"');
                }
                else {
                    ctx.set('Content-Disposition', 'attachment; filename=' + new Buffer(filename).toString('binary'));
                }
                return sendfile_1.default(ctx, filename, config);
            }
        });
        await next();
    };
}
exports.default = default_1;
