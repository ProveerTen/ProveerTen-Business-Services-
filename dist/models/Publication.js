"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const publication_schema = new mongoose_1.Schema({
    _id: String,
    text: String,
    image: String,
    nit_company: String,
    image_url: String,
    secure_url: String,
    public_id: String
});
exports.default = (0, mongoose_1.model)('Publication', publication_schema);
