"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class AccessGateRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.AccessGate, transaction);
    }
    async findById(id) {
        try {
            if (!models_1.models.AccessGate.associations.accessSite) {
                models_1.models.AccessGate.belongsTo(models_1.models.AccessSite, { foreignKey: 'accessSiteId', targetKey: 'id', as: 'accessSite', constraints: false });
            }
            return await this.findOne({ id }, {
                include: [{
                        model: models_1.models.AccessSite,
                        as: 'accessSite'
                    }]
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AccessGateRepository = AccessGateRepository;
