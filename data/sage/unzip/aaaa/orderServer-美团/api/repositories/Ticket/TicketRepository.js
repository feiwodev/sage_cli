"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const Repository_1 = require("../utils/Repository");
const ProductRepository_1 = require("../Product/ProductRepository");
const _ = require("lodash");
class TicketRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Ticket, transaction);
    }
    async createTicket(ticket) {
        try {
            let createdTicket = await this.create(ticket);
            return createdTicket;
        }
        catch (error) {
            throw error;
        }
    }
    async findList() {
        try {
            let ticketList = await this.find();
            return ticketList;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            let ticket = await this.findOne({ id });
            if (ticket) {
                ticket.product = await this.productRepository.findById(ticket.productId);
            }
            return ticket;
        }
        catch (error) {
            throw error;
        }
    }
    async findByIds(ids) {
        try {
            let ticketList = await this.find({ id: ids });
            if (ticketList && ticketList.length) {
                const productIds = _.map(ticketList, 'productId');
                const productList = await this.productRepository.findByIds(productIds);
                ticketList.forEach((ticket) => {
                    ticket.product = _.find(productList, {
                        id: ticket.productId
                    });
                });
            }
            return ticketList;
        }
        catch (error) {
            throw error;
        }
    }
    async findByProductId(productId) {
        try {
            return await this.findOne({ productId });
        }
        catch (error) {
            throw error;
        }
    }
}
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", ProductRepository_1.ProductRepository)
], TicketRepository.prototype, "productRepository", void 0);
exports.TicketRepository = TicketRepository;
