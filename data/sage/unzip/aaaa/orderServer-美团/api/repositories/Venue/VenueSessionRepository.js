"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VenueSessionRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VenueSession, transaction);
    }
    async findListById(venueSessionId) {
        try {
            return await this.findOne({ id: venueSessionId });
        }
        catch (error) {
            throw error;
        }
    }
    async findListByIds(venueSessionIds) {
        try {
            let option = {
                where: {
                    id: venueSessionIds,
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
exports.VenueSessionRepository = VenueSessionRepository;
