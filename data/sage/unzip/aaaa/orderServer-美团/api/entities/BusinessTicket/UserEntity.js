"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = require("../../models/BaseSettings/Employee");
class UserEntity extends Employee_1.Employee {
    constructor() {
        super(...arguments);
        this.isAdmin = false;
    }
}
exports.UserEntity = UserEntity;
