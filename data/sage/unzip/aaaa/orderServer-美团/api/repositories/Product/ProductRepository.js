"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ProductRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Product, transaction);
    }
    async createProduct(product) {
        try {
            let createdProduct = await this.create(product);
            return createdProduct;
        }
        catch (error) {
            throw error;
        }
    }
    async findByIds(ids) {
        try {
            if (!models_1.models.Product.associations.productCategory) {
                models_1.models.Product.belongsTo(models_1.models.ProductCategory, { foreignKey: 'productCategoryId', targetKey: 'id', as: 'productCategory', constraints: false });
            }
            if (!models_1.models.Product.associations.numberRule) {
                models_1.models.Product.belongsTo(models_1.models.NumberRules, { foreignKey: 'numberRulesId', targetKey: 'id', as: 'numberRule', constraints: false });
            }
            if (!models_1.models.Product.associations.subProductList) {
                models_1.models.Product.hasMany(models_1.models.ProductCompose, { foreignKey: 'productId', sourceKey: 'id', as: 'subProductList', constraints: false });
            }
            let productList = await this.find({ isUse: true, id: ids || [] }, {
                include: [{
                        model: models_1.models.ProductCategory,
                        as: 'productCategory'
                    },
                    {
                        model: models_1.models.NumberRules,
                        as: 'numberRule'
                    },
                    {
                        model: models_1.models.ProductCompose,
                        as: 'subProductList'
                    }]
            });
            for (let product of productList) {
                let newSubProductList = [];
                let newSubProduct = null;
                if (product.subProductList && product.subProductList.length) {
                    for (let subProduct of product.subProductList) {
                        newSubProduct = await this.findOne({ id: subProduct.productSubId });
                        newSubProduct.sellLimit = subProduct.sellLimit;
                        newSubProduct.selected = subProduct.sellLimit ? false : true;
                        newSubProduct.composeNum = subProduct.composeNum;
                        newSubProduct.percentValue = subProduct.percentValue;
                        newSubProduct.actualAmount = subProduct.actualAmount;
                        newSubProduct.memo = subProduct.memo;
                        newSubProductList.push(newSubProduct);
                    }
                    product.subProductList = newSubProductList;
                }
            }
            return productList;
        }
        catch (error) {
            throw error;
        }
    }
    async findByCategoryId(productCategoryId) {
        try {
            if (!models_1.models.Product.associations.productCategory) {
                models_1.models.Product.belongsTo(models_1.models.ProductCategory, { foreignKey: 'productCategoryId', targetKey: 'id', as: 'productCategory', constraints: false });
            }
            if (!models_1.models.Product.associations.numberRule) {
                models_1.models.Product.belongsTo(models_1.models.NumberRules, { foreignKey: 'numberRulesId', targetKey: 'id', as: 'numberRule', constraints: false });
            }
            if (!models_1.models.Product.associations.subProductList) {
                models_1.models.Product.hasMany(models_1.models.ProductCompose, { foreignKey: 'productId', sourceKey: 'id', as: 'subProductList', constraints: false });
            }
            let productList = await this.find({ isUse: true, productCategoryId }, {
                include: [{
                        model: models_1.models.ProductCategory,
                        as: 'productCategory'
                    },
                    {
                        model: models_1.models.NumberRules,
                        as: 'numberRule'
                    },
                    {
                        model: models_1.models.ProductCompose,
                        as: 'subProductList'
                    }]
            });
            for (let product of productList) {
                let newSubProductList = [];
                let newSubProduct = null;
                if (product.subProductList && product.subProductList.length) {
                    for (let subProduct of product.subProductList) {
                        newSubProduct = await this.findOne({ id: subProduct.productSubId });
                        newSubProduct.sellLimit = subProduct.sellLimit;
                        newSubProduct.selected = subProduct.sellLimit ? false : true;
                        newSubProduct.composeNum = subProduct.composeNum;
                        newSubProduct.percentValue = subProduct.percentValue;
                        newSubProduct.actualAmount = subProduct.actualAmount;
                        newSubProduct.memo = subProduct.memo;
                        newSubProductList.push(newSubProduct);
                    }
                    product.subProductList = newSubProductList;
                }
            }
            return productList;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            if (!models_1.models.Product.associations.productCategory) {
                models_1.models.Product.belongsTo(models_1.models.ProductCategory, { foreignKey: 'productCategoryId', targetKey: 'id', as: 'productCategory', constraints: false });
            }
            if (!models_1.models.Product.associations.numberRule) {
                models_1.models.Product.belongsTo(models_1.models.NumberRules, { foreignKey: 'numberRulesId', targetKey: 'id', as: 'numberRule', constraints: false });
            }
            if (!models_1.models.Product.associations.subProductList) {
                models_1.models.Product.hasMany(models_1.models.ProductCompose, { foreignKey: 'productId', sourceKey: 'id', as: 'subProductList', constraints: false });
            }
            let product = await this.findOne({ id }, {
                include: [{
                        model: models_1.models.ProductCategory,
                        as: 'productCategory'
                    },
                    {
                        model: models_1.models.NumberRules,
                        as: 'numberRule'
                    },
                    {
                        model: models_1.models.ProductCompose,
                        as: 'subProductList'
                    }]
            });
            let newSubProductList = [];
            let newSubProduct = null;
            if (product.subProductList && product.subProductList.length) {
                for (let subProduct of product.subProductList) {
                    newSubProduct = await this.findById(subProduct.productSubId);
                    newSubProduct.sellLimit = subProduct.sellLimit;
                    newSubProduct.selected = subProduct.sellLimit ? false : true;
                    newSubProduct.composeNum = subProduct.composeNum;
                    newSubProduct.actualAmount = subProduct.actualAmount;
                    newSubProductList.push(newSubProduct);
                }
                product.subProductList = newSubProductList;
            }
            return product;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductRepository = ProductRepository;
