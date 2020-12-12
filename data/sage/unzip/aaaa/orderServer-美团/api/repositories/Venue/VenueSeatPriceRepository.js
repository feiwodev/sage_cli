"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VenueSeatPriceRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VenueSeatPrice, transaction);
    }
    async findListByVenueSessionIds(venueSessionIds) {
        try {
            let option = {
                where: {
                    venueSessionId: venueSessionIds,
                    isUse: true
                },
                order: [
                    ['startTime', 'ASC']
                ]
            };
            return await this.find(option);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VenueSeatPriceRepository = VenueSeatPriceRepository;
