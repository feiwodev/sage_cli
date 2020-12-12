"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class UserAreaRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.AreaEmployee, transaction);
    }
    async findByUser(userId) {
        try {
            return this.find({ employeeId: userId });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserAreaRepository = UserAreaRepository;
