"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ReprintRightRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.ExceptionHandling, transaction);
    }
    async findListByUser(userId) {
        try {
            const sql = `SELECT
                            eh.*
                        FROM
                            ExceptionHandling AS eh
                        LEFT JOIN ReprintRight AS rr ON rr.exceptionHandlingId = eh.id
                        LEFT JOIN EmployeePost AS ep ON ep.postId = rr.postId
                        WHERE
                            ep.employeeId = ${userId}
                        AND rr.deletedAt IS NULL
                        AND eh.deletedAt IS NULL
                        AND eh.type = 1
                        AND eh.isUse = 1`;
            return await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ReprintRightRepository = ReprintRightRepository;
