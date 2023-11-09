"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTest = void 0;
const express = require('express');
const express_1 = require("express");
const auth_token_1 = __importDefault(require("../middleware/auth-token"));
const test_controller_1 = __importDefault(require("../controllers/test-controller"));
const routerTest = (0, express_1.Router)();
exports.routerTest = routerTest;
routerTest.get('/', auth_token_1.default.jwtAuth, test_controller_1.default.testController);
