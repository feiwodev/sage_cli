"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const RawFilter = require("./RawFilter");
class DbContext {
    constructor(model, transaction) {
        this.model = model;
        this.transaction = transaction;
    }
    async create(obj) {
        try {
            let created = await this.model.create(obj, {
                transaction: this.transaction || models_1.db.transaction
            });
            return RawFilter.toJsonData(created);
        }
        catch (error) {
            throw error;
        }
    }
    async bulkCreate(array) {
        try {
            let data = await this.model.bulkCreate(array, {
                transaction: this.transaction || models_1.db.transaction
            });
            return RawFilter.toJsonData(data);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(criteria, force = false) {
        try {
            if (typeof criteria === 'object') {
                await this.model.destroy({
                    where: criteria,
                    force: force,
                    transaction: this.transaction || models_1.db.transaction
                });
            }
            else if (typeof criteria === 'number') {
                await this.model.destroy({
                    where: { id: criteria },
                    force: force,
                    transaction: this.transaction || models_1.db.transaction
                });
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async update(obj, criteria) {
        try {
            let options = { where: {}, transaction: this.transaction || models_1.db.transaction };
            if (!criteria) {
                if (!obj.id) {
                    throw '对象的id为空,无法更新';
                }
                options.where = { id: obj.id };
            }
            else {
                options.where = criteria;
            }
            await this.model.update(obj, options);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async find(where, options) {
        try {
            options = options || {};
            let data = await this.model.findAll(Object.assign({}, options, { where: where || {} }));
            return RawFilter.toJsonData(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            let data = await this.model.findById(id);
            return RawFilter.toJsonData(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(where, options) {
        try {
            options = options || {};
            let data = await this.model.findOne(Object.assign({}, options, { where: where || {} }));
            return RawFilter.toJsonData(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findMax(col, where) {
        try {
            let data = await this.model.findOne({ where: where || {}, order: [[col || 'id', 'DESC']] });
            return RawFilter.toJsonData(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findMin(col, where) {
        try {
            let data = await this.model.findOne({ where: where || {}, order: [[col || 'id', 'ASC']] });
            return RawFilter.toJsonData(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findAndCountAll(where, limit, offset) {
        try {
            let data = await this.model.findAndCountAll({
                where: where || {},
                offset: offset || 0,
                limit: limit
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async max(col, where) {
        try {
            let data = await this.model.max(col || 'id', { where: where || {} });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async min(col, where) {
        try {
            let data = await this.model.min(col || 'id', { where: where || {} });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async sum(col, where) {
        try {
            let data = await this.model.sum(col || 'id', { where: where || {} });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async count(where) {
        try {
            let count = await this.model.count({ where: where || {} });
            return count;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DbContext = DbContext;
