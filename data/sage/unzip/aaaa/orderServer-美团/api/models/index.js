"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const SequelizeStatic = require("sequelize");
const appConfig = require("../../config/config");
const database = require("../../config/database");
const debug_1 = require("debug");
const debug = debug_1.default('sequelize');
const config = database[appConfig.env];
let _models;
let _sequelize;
_sequelize = new SequelizeStatic(config.database, config.username, config.password, Object.assign({}, config, {
    logging: appConfig.env === 'development' ? false : false,
    underscored: true,
    underscoredAll: true,
    isolationLevel: SequelizeStatic.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    define: {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        schemaDelimiter: '_',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    },
    sync: {
        force: false
    }
}));
const loadModels = (modelsPath, schema) => {
    fs.readdirSync(modelsPath).forEach(filename => {
        let modelPath = path.resolve(modelsPath, filename), stats = fs.lstatSync(modelPath), isDirectory = stats.isDirectory(), validNameRegex = /^(.+)\.(js|ts|json)/, isValidFile = validNameRegex.test(filename) || isDirectory;
        if (!isValidFile || filename === path.basename(module.filename)) {
            return;
        }
        if (isDirectory) {
            loadModels(modelPath, '');
        }
        else {
            let model = require(modelPath), name = filename.match(validNameRegex)[1];
            if (!_sequelize.isDefined(name)) {
                if (model.attributes && 'function' === typeof model.attributes) {
                    let { options = {}, attributes } = model;
                    if (schema) {
                        options.schema = schema;
                    }
                    _sequelize.define(name, attributes(SequelizeStatic), options);
                }
                else {
                    _sequelize.import(modelPath);
                }
            }
            else {
                debug(`model: ${name},is defined`);
            }
        }
    });
};
const associateModels = () => {
    _models = _sequelize.models;
    if (!global['$models']) {
        global['$models'] = {};
    }
    Object.keys(_models).forEach(key => {
        if (!global['$models'][key]) {
            let model = _models[key];
            if ('associate' in model) {
                model.associate(_models);
            }
            global[key] = model;
            if (!_sequelize.options.sync.force) {
                model.sync = (options) => {
                    return null;
                };
            }
            debug(`model: ${model.name},associations: [${Object.keys(model.associations).join()}]`);
        }
    });
};
const dynamicLoadModels = (modelsPath, schema) => {
    if (typeof (modelsPath) === 'object') {
        for (let path of modelsPath) {
            loadModels(path, schema);
        }
    }
    else {
        loadModels(modelsPath, schema);
    }
    associateModels();
};
dynamicLoadModels(__dirname, '');
exports.sequelize = _sequelize;
exports.models = _models;
let isTransactionActive = false;
let isReleased = true;
exports.db = {
    transaction: null,
    createTransaction: async (isolationLevel, autocommit = false) => {
        if (!isReleased) {
            return null;
        }
        exports.db.transaction = await exports.sequelize.transaction({
            autocommit,
            isolationLevel
        });
        isTransactionActive = true;
        return exports.db.transaction;
    },
    beginTransaction: async () => {
        while (isReleased && !isTransactionActive) {
            isReleased = false;
            return await exports.db.createTransaction(exports.sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED, false);
        }
    },
    commitTransaction: async () => {
        if (isTransactionActive && exports.db.transaction && exports.db.transaction.finished !== 'commit') {
            await exports.db.transaction.commit();
            isTransactionActive = false;
        }
    },
    rollbackTransaction: async () => {
        if (isTransactionActive && exports.db.transaction && exports.db.transaction.rollback && exports.db.transaction.finished !== 'commit') {
            await exports.db.transaction.rollback();
            isTransactionActive = false;
        }
    },
    closeTransaction: async () => {
        isReleased = true;
        exports.db.transaction = null;
    }
};
