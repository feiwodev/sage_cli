"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class DepartmentRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Department, transaction);
    }
    async findByUser(userId) {
        try {
            if (!models_1.models.Department.associations.departmentEmployee) {
                models_1.models.Department.belongsTo(models_1.models.DepartmentEmployee, { foreignKey: 'id', targetKey: 'departmentId', as: 'departmentEmployee', constraints: false });
            }
            let departmentList = await this.find({}, {
                include: [{
                        model: models_1.models.DepartmentEmployee,
                        as: 'departmentEmployee',
                        where: {
                            employeeId: userId
                        }
                    }]
            });
            return departmentList;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DepartmentRepository = DepartmentRepository;
