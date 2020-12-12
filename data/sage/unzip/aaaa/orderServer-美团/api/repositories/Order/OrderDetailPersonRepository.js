"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class OrderDetailPersonRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.OrderDetailPerson, transaction);
    }
    async findOrderDetailPersons(orderDetailId) {
        try {
            return await this.find({ orderDetailId });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderDetailPerson(orderDetailPerson) {
        try {
            return await this.create(orderDetailPerson);
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderDetailPersons(orderDetailPersons) {
        try {
            return await this.bulkCreate(orderDetailPersons);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderDetailPersonRepository = OrderDetailPersonRepository;
