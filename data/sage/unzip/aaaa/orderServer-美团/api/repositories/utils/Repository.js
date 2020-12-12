"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Repository() {
    return (target, propertyKey) => {
        let c = Reflect.getMetadata('design:type', target, propertyKey);
        target[propertyKey] = new c();
        Reflect.defineMetadata('custom:metaData', 'repository', target, propertyKey);
    };
}
exports.Repository = Repository;
