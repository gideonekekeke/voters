"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const legalSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
    },
    position: {
        type: String,
    },
    image: {
        type: String,
    },
    user: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    voter: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "voters",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("legals", legalSchema);
