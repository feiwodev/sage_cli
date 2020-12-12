"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VenueSessionSalesHoldRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VenueSessionSalesHold, transaction);
    }
    async createSalesHold(venueSessionSalesHold) {
        try {
            return this.create(venueSessionSalesHold);
        }
        catch (error) {
            throw error;
        }
    }
    async findFailedList(holdTime) {
        try {
            return await this.find({
                holdTime: {
                    $lt: holdTime
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByVoucher(venueShowScheduleId, voucherNumber) {
        try {
            return await this.findOne({ venueShowScheduleId, voucherNumber });
        }
        catch (error) {
            throw error;
        }
    }
    async updateSalesHold(venueSessionSalesHoldId, quantity) {
        try {
            await this.update({
                quantity
            }, {
                id: venueSessionSalesHoldId
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteSalesHold(venueSessionSalesHoldId) {
        try {
            await this.delete(venueSessionSalesHoldId, true);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VenueSessionSalesHoldRepository = VenueSessionSalesHoldRepository;
