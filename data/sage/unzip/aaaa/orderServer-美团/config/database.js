"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'Asdf123$%^',
    database: process.env.DATABASE_NAME || 'sage_test',
    host: process.env.DATABASE_HOST || '39.108.168.54',
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00'
};
exports.test = {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'roas_test',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00'
};
exports.production = {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'roas',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00'
};
