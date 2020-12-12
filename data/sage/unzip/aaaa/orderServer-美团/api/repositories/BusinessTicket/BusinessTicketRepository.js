"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class BusinessTicketRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.BusinessTicket, transaction);
    }
    async findByBusinessPriceId(businessPriceId) {
        try {
            let sql = `SELECT
                            bt.*,
                            bs.salesSchemeId,
                            bc.businessSchemeId,
                            bc.crowdKindId,
                            bp.businessCrowdId,
                            bp.priceId,
                            bp.discountSchemeId,
                            bp.peopleNumRange,
                            bp.actualSalePrice,
                            bp.id AS businessPriceId
                        FROM
                            BusinessTicket AS bt
                        LEFT JOIN BusinessScheme AS bs ON bs.businessTicketId = bt.id
                        LEFT JOIN BusinessCrowd AS bc ON bc.businessSchemeId = bs.id
                        LEFT JOIN BusinessPrice AS bp ON bp.businessCrowdId = bc.id
                        WHERE
                            bp.id = ${businessPriceId}        
                        AND bt.isUse = 1
                        LIMIT 1`;
            let businessTicketList = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            if (businessTicketList && businessTicketList.length) {
                return businessTicketList[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findBySalesSchemeId(businessTicketId, salesSchemeId) {
        try {
            let sql = `SELECT
                            bt.*,
                            bs.salesSchemeId,
                            bc.businessSchemeId,
                            bc.crowdKindId,
                            bp.businessCrowdId,
                            bp.priceId,
                            bp.discountSchemeId,
                            bp.peopleNumRange,
                            bp.actualSalePrice,
                            bp.id AS businessPriceId
                        FROM
                            BusinessTicket AS bt
                        LEFT JOIN BusinessScheme AS bs ON bs.businessTicketId = bt.id
                        LEFT JOIN BusinessCrowd AS bc ON bc.businessSchemeId = bs.id
                        LEFT JOIN BusinessPrice AS bp ON bp.businessCrowdId = bc.id
                        WHERE
                            bt.id = ${businessTicketId}`;
            if (salesSchemeId) {
                sql += ` AND bs.salesSchemeId = ${salesSchemeId}`;
            }
            sql += ` AND bt.isUse = 1 LIMIT 1`;
            let businessTicketList = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            if (businessTicketList && businessTicketList.length) {
                return businessTicketList[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findByBusinessProductId(businessId, productId, salesSchemeId, crowdKindId, priceId) {
        try {
            let sql = `SELECT
                            bt.*,
                            bs.salesSchemeId,
                            bc.businessSchemeId,
                            bc.crowdKindId,
                            bp.businessCrowdId,
                            bp.priceId,
                            bp.discountSchemeId,
                            bp.peopleNumRange,
                            bp.actualSalePrice,
                            bp.id AS businessPriceId
                        FROM
                            BusinessTicket AS bt
                        LEFT JOIN BusinessScheme AS bs ON bs.businessTicketId = bt.id
                        LEFT JOIN BusinessCrowd AS bc ON bc.businessSchemeId = bs.id
                        LEFT JOIN BusinessPrice AS bp ON bp.businessCrowdId = bc.id
                        LEFT JOIN Ticket AS t ON bt.ticketId = t.id
                        WHERE
                            bt.businessId = ${businessId}  
                        AND bs.salesSchemeId = ${salesSchemeId} 
                        AND bc.crowdKindId = ${crowdKindId} 
                        AND bp.priceId = ${priceId} 
                        AND t.productId = ${productId}   
                        AND bt.isUse = 1
                        LIMIT 1`;
            let businessTicketList = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            if (businessTicketList && businessTicketList.length) {
                return businessTicketList[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findBusinessTickets(businessId, isOnLine = 0, limit, offset) {
        try {
            let sql = `SELECT
                            bt.*,
                            bs.salesSchemeId,
                            bc.businessSchemeId,
                            bc.crowdKindId,
                            bp.businessCrowdId,
                            bp.priceId,
                            bp.discountSchemeId,
                            bp.peopleNumRange,
                            bp.actualSalePrice,
                            bp.id AS businessPriceId
                        FROM
                            BusinessTicket AS bt
                        LEFT JOIN BusinessScheme AS bs ON bs.businessTicketId = bt.id
                        LEFT JOIN BusinessCrowd AS bc ON bc.businessSchemeId = bs.id
                        LEFT JOIN BusinessPrice AS bp ON bp.businessCrowdId = bc.id
                        LEFT JOIN SalesScheme AS ss ON bs.salesSchemeId = ss.id
                        WHERE
                            ss.isOnLine = ${isOnLine}    
                        AND bt.isUse = 1`;
            if (businessId) {
                if (Array.isArray(businessId)) {
                    sql += ' AND bt.businessId IN(' + businessId + ')';
                }
                else {
                    sql += ' AND bt.businessId = ' + businessId;
                }
            }
            if (limit && offset) {
                sql += ' LIMIT ' + limit + ',' + offset;
            }
            else if (limit) {
                sql += ' LIMIT ' + limit;
            }
            else if (offset) {
                sql += ' LIMIT ' + offset;
            }
            let businessTicketList = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            return businessTicketList;
        }
        catch (error) {
            throw error;
        }
    }
    async findUseBusinessTickets(salesSchemeId, businessId, businessPriceIds) {
        try {
            let sql = `SELECT
                            bt.*,
                            bs.salesSchemeId,
                            bc.businessSchemeId,
                            bc.crowdKindId,
                            bp.businessCrowdId,
                            bp.priceId,
                            bp.discountSchemeId,
                            bp.peopleNumRange,
                            bp.actualSalePrice,
                            bp.id AS businessPriceId
                        FROM
                            BusinessTicket AS bt
                        LEFT JOIN BusinessScheme AS bs ON bs.businessTicketId = bt.id
                        LEFT JOIN BusinessCrowd AS bc ON bc.businessSchemeId = bs.id
                        LEFT JOIN BusinessPrice AS bp ON bp.businessCrowdId = bc.id
                        WHERE
                            bs.salesSchemeId = ${salesSchemeId}        
                        AND bt.isUse = 1`;
            if (businessId) {
                sql += ' AND bt.businessId = ' + businessId;
            }
            if (businessPriceIds && businessPriceIds.length > 0) {
                sql += ' AND bp.id IN (' + businessPriceIds.join() + ')';
            }
            let businessTicketList = await models_1.sequelize.query(sql, {
                raw: true,
                nest: true
            });
            return businessTicketList;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BusinessTicketRepository = BusinessTicketRepository;
