"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "dv4dlmp4e",
    api_key: "464513458841612",
    api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
});
exports.default = cloudinary;
