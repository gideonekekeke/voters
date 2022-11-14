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
exports.createVote = exports.readYourVoters = exports.readVote = void 0;
const userModel_1 = __importDefault(require("../../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const votersModel_1 = __importDefault(require("../../model/votersModel"));
const vicePresy_1 = __importDefault(require("../../votes/president/vicePresy"));
const readVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const read = yield votersModel_1.default.find();
        return res.json({ message: "Reading all Voters", data: read });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readVote = readVote;
const readYourVoters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const read = yield userModel_1.default.findById(req.params.id).populate({
            path: "voter",
            options: { sort: { createdAt: -1 } },
        });
        return res.json({
            message: `Reading ${read === null || read === void 0 ? void 0 : read.fullName} voters`,
            data: read,
        });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readYourVoters = readYourVoters;
const createVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userModel_1.default.findById(req.params.voterID);
        const getUser = yield userModel_1.default.findById(req.params.id);
        const getVote = yield vicePresy_1.default.findById(req.params.voterID);
        if (!getVote) {
            const vote = yield votersModel_1.default.create({
                user,
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
            });
            yield vicePresy_1.default.create({
                _id: user === null || user === void 0 ? void 0 : user._id,
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                user,
            });
            (_a = getUser.voter) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(vote._id));
            getUser.save();
            return res.status(201).json({ message: "vote added" });
        }
        else {
            return res.json({ message: `You've Already voted for Vice President` });
        }
    }
    catch (err) {
        return res.json({ message: `error message: ${err}` });
    }
});
exports.createVote = createVote;
