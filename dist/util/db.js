"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://localhost/AjElectionDB";
const newURL = "mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/AjMainVote?retryWrites=true&w=majority";
mongoose_1.default.connect(newURL, () => {
    console.log("database is now connected...!");
});
exports.default = mongoose_1.default;
