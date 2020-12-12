"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const _ = require("lodash");
class UserRightRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.PostRight, transaction);
    }
    async findBusinessPriceIds(userId) {
        try {
            let sql = `SELECT DISTINCT pr.businessPriceId FROM PostRight AS pr
                        LEFT JOIN EmployeePost AS ep 
                        ON pr.postId = ep.postId
                        WHERE ep.employeeId = ${userId}`;
            let data = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            let businessPriceIds = null;
            if (data && data.length) {
                businessPriceIds = _.map(data, 'businessPriceId');
            }
            return businessPriceIds;
        }
        catch (error) {
            console.info(error);
            throw error;
        }
    }
}
exports.UserRightRepository = UserRightRepository;
