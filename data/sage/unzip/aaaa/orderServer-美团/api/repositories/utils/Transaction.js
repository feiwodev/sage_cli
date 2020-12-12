"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const models_1 = require("../../models");
const DbContext_1 = require("./DbContext");
const SequelizeStatic = require("sequelize");
function Transaction(isolationLevel) {
    return function (target, methodName, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = async (...args) => {
            let transaction = await models_1.sequelize.transaction({
                isolationLevel: isolationLevel || SequelizeStatic.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
            });
            let loadTransactionRepository = (service) => {
                for (let r in service) {
                    if (service[r] instanceof DbContext_1.DbContext) {
                        let c = Reflect.getMetadata('design:type', service, r);
                        service[r] = new c(transaction);
                    }
                }
            };
            let loadTransactionService = (obj) => {
                for (let s in obj) {
                    if (obj[s] instanceof Object && Reflect.getMetadata('custom:metaData', obj, s) === 'service') {
                        let c = Reflect.getMetadata('design:type', obj, s);
                        obj[s] = new c(transaction);
                        loadTransactionRepository(obj[s]);
                        loadTransactionService(obj[s]);
                    }
                }
            };
            let c = new target.constructor();
            loadTransactionRepository(c);
            loadTransactionService(c);
            try {
                let result = await originalMethod.apply(c, args);
                await transaction.commit();
                return result;
            }
            catch (error) {
                if (transaction) {
                    await transaction.rollback();
                }
                throw error;
            }
            finally {
                transaction = null;
            }
        };
    };
}
exports.Transaction = Transaction;
