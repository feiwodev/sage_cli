"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ChannelRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Channel, transaction);
    }
    async createChannel(channel) {
        try {
            return await this.create(channel);
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findByName(name) {
        try {
            return await this.findOne({ name });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ChannelRepository = ChannelRepository;
