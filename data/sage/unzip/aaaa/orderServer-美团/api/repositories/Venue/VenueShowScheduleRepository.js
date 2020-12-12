"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class VenueShowScheduleRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VenueShowSchedule, transaction);
    }
    async findById(venueShowScheduleId) {
        try {
            return await this.findOne({ id: venueShowScheduleId });
        }
        catch (error) {
            throw error;
        }
    }
    async findByProductAndDate(productId, date, isBefore) {
        try {
            let option = {
                where: {
                    productId: productId,
                    startDate: {
                        $gte: moment(date).format('YYYY-MM-DD') + ' 00:00:00'
                    },
                    endDate: {
                        $lte: moment(date).format('YYYY-MM-DD') + ' 23:59:59',
                        $gte: moment().format('YYYY-MM-DD HH:mm:ss')
                    },
                    isUse: true
                },
                order: [
                    ['startDate', 'ASC']
                ]
            };
            if (isBefore) {
                option.where.startDate = {
                    $gte: moment(date).format('YYYY-MM-DD') + ' 00:00:00'
                };
                if (moment(moment(date).format('YYYY-MM-DD')).isBefore(moment().format('YYYY-MM-DD'))) {
                    option.where.endDate = {
                        $lte: moment(date).format('YYYY-MM-DD') + ' 23:59:59'
                    };
                }
                else {
                    option.where.endDate = {
                        $lte: moment().format('YYYY-MM-DD HH:mm:ss')
                    };
                }
            }
            return await this.find(option);
        }
        catch (error) {
            throw error;
        }
    }
    async findByVenueSessionAndDate(venueSessionId, startDate) {
        try {
            let option = {
                where: {
                    venueSessionId,
                    startDate,
                    isUse: true
                },
                order: [
                    ['startDate', 'ASC']
                ]
            };
            return await this.findOne(option);
        }
        catch (error) {
            throw error;
        }
    }
    async updateSalesQuantity(venueShowScheduleId, remaining, realSales) {
        try {
            await this.update({
                remaining,
                realSales
            }, {
                id: venueShowScheduleId
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VenueShowScheduleRepository = VenueShowScheduleRepository;
