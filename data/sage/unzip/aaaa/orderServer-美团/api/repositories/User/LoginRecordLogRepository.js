"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class LoginRecordLogRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.LoginRecordLog, transaction);
    }
    async insertLoginRecordLog(loginRecordLog) {
        try {
            return await this.create(loginRecordLog);
        }
        catch (error) {
            throw error;
        }
    }
    async findByUniqueCode(uniqueCode, salesWinId) {
        try {
            let where = ` `;
            if (salesWinId) {
                where = ` AND salesWinId = ${salesWinId} `;
            }
            let sql = `SELECT
                            t.*,e.name AS userName,e.photoDir
                        FROM
                            (
                                SELECT
                                    id,
                                    salesWinId,
                                    uniqueCode,
                                    employeeId,
                                    MAX(loginDate) as loginDate,
                                    createdAt,
                                    updatedAt
                                FROM
                                    LoginRecordLog AS A
                                WHERE
                                    uniqueCode = '${uniqueCode}'
                                    ${where}
                                GROUP BY 
                                    employeeId
                                ORDER BY
                                    loginDate DESC
                                LIMIT 10
                            ) AS t
                        INNER JOIN Employee AS e ON t.employeeId=e.id
                        ORDER BY t.loginDate DESC`;
            let recordLogs = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            return recordLogs;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.LoginRecordLogRepository = LoginRecordLogRepository;
