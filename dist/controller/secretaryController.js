"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPresident = exports.readPresidentFromUsers = exports.readPresident = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const email_1 = require("../util/email");
const secretaryModel_1 = __importDefault(require("../model/secretaryModel"));
const candidateModel_1 = __importDefault(require("../model/candidateModel"));
const readPresident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const read = yield secretaryModel_1.default.find();
        return res.json({ message: "Reading all Secretary", data: read });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readPresident = readPresident;
const readPresidentFromUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const read = yield userModel_1.default.findById(req.params.id).populate({
            path: "Secretary",
            options: { sort: { createdAt: -1 } },
        });
        return res.json({
            message: "Reading all Secretary Post",
            data: read,
        });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readPresidentFromUsers = readPresidentFromUsers;
const createPresident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, position } = req.body;
        const user = yield userModel_1.default.findById(req === null || req === void 0 ? void 0 : req.params.id);
        let name = user === null || user === void 0 ? void 0 : user.fullName;
        let email = user === null || user === void 0 ? void 0 : user.email;
        let id = user === null || user === void 0 ? void 0 : user._id;
        const candidate = yield candidateModel_1.default.findOne({ fullName: name });
        if (candidate !== null) {
            return res.json({
                message: `You can't register '${name}' because he/she has already been registered, for the position of ${candidate.position}.`,
            });
        }
        if (user) {
            const getUser = yield userModel_1.default.findById(user === null || user === void 0 ? void 0 : user._id);
            const positioned = yield secretaryModel_1.default.create({
                _id: user._id,
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                position: "Secretary",
                user,
            });
            getUser === null || getUser === void 0 ? void 0 : getUser.secretary.push(new mongoose_1.default.Types.ObjectId(positioned._id));
            getUser === null || getUser === void 0 ? void 0 : getUser.save();
            yield candidateModel_1.default.create({
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                position: positioned === null || positioned === void 0 ? void 0 : positioned.position,
                user,
            });
            yield userModel_1.default.findByIdAndUpdate(req === null || req === void 0 ? void 0 : req.params.id, {
                position: "Secretary",
            }, { new: true });
            (0, email_1.acceptance)(email, user, fullName).then((result) => {
                console.log("sent: ", result);
            });
            // console.log("getting data: ", getUser);
            return res.json({
                message: `Position as ${positioned.position} has been created for ${user === null || user === void 0 ? void 0 : user.fullName}`,
            });
        }
        else {
            return res.json({
                message: `You can't register because ${fullName} doesn't exist`,
            });
        }
        // return res.end();
    }
    catch (err) {
        return res.json({ message: `error message: ${err}` });
    }
});
exports.createPresident = createPresident;
