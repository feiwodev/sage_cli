"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class SalesSchemeRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SalesScheme, transaction);
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findByIds(ids) {
        try {
            return await this.find({ id: ids });
        }
        catch (error) {
            throw error;
        }
    }
    async getCurrentSalesScheme(isOnLine = 1) {
        try {
            if (!models_1.models.SalesScheme.associations.salesSchemePeriod) {
                models_1.models.SalesScheme.belongsTo(models_1.models.SalesSchemePeriod, { foreignKey: 'id', targetKey: 'salesSchemeId', as: 'salesSchemePeriod', constraints: false });
            }
            if (!models_1.models.SalesScheme.associations.salesSchemeSchedule) {
                models_1.models.SalesScheme.belongsTo(models_1.models.SalesSchemeSchedule, { foreignKey: 'id', targetKey: 'salesSchemeId', as: 'salesSchemeSchedule', constraints: false });
            }
            const salesScheme = await this.findOne({ isOnLine, isUse: 1 }, {
                order: [['type', 'DESC']],
                include: [{
                        model: models_1.models.SalesSchemePeriod,
                        where: {
                            startTime: {
                                $lte: moment().format('HH:mm')
                            },
                            endTime: {
                                $gte: moment().format('HH:mm')
                            },
                            firstPeriod: {
                                $like: '%' + moment().day() + '%'
                            }
                        },
                        as: 'salesSchemePeriod'
                    },
                    {
                        model: models_1.models.SalesSchemeSchedule,
                        where: {
                            startDay: {
                                $lte: moment().format('YYYY-MM-DD')
                            },
                            endDay: {
                                $gte: moment().format('YYYY-MM-DD')
                            }
                        },
                        as: 'salesSchemeSchedule'
                    }]
            });
            return salesScheme;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SalesSchemeRepository = SalesSchemeRepository;
