"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ManagerRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Manager, transaction);
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findListByCustomer(customerId, keyword, limit, offset) {
        try {
            let where = {
                customerId,
                isUse: true
            };
            if (keyword) {
                where.$or = [{
                        name: {
                            $like: '%' + keyword + '%'
                        }
                    },
                    {
                        code: {
                            $like: '%' + keyword + '%'
                        }
                    },
                    {
                        spellCode: {
                            $like: '%' + keyword + '%'
                        }
                    }];
            }
            return this.find(where, {
                order: [
                    ['code', 'ASC']
                ],
                limit: limit,
                offset: offset
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ManagerRepository = ManagerRepository;
