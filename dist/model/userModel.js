"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    orgName: {
        type: String,
    },
    position: {
        type: String,
    },
    orgEmail: {
        type: String,
    },
    voteCode: {
        type: String,
    },
    organisationName: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "organisations",
    },
    president: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "presidents",
        },
    ],
    vicePresident: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "vicePresidents",
        },
    ],
    secretary: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "secretarys",
        },
    ],
    socialSecretary: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "socialSecretarys",
        },
    ],
    pro: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "pros",
        },
    ],
    legal: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "legals",
        },
    ],
    voter: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "voters",
        },
    ],
    verified: {
        type: Boolean,
    },
    superAdmin: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userSchema);
