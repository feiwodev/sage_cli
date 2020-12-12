"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class UserRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Employee, transaction);
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findByUserName(userName) {
        try {
            return await this.find({
                $or: [{
                        name: userName
                    }, {
                        code: userName
                    }, {
                        phone: userName
                    }, {
                        idCard: userName
                    }]
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
