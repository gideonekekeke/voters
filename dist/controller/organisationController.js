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
exports.getOrganisationMembers = exports.getCandidates = exports.getOrganisation = exports.createOrganisation = void 0;
const organisationModel_1 = __importDefault(require("../model/organisationModel"));
const candidateModel_1 = __importDefault(require("../model/candidateModel"));
const createOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organisationName, email } = req.body;
        const organisation = yield organisationModel_1.default.create({
            organisationName,
            email,
        });
        return res.json({
            message: "Organisation created",
            data: organisation,
        });
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.createOrganisation = createOrganisation;
const getOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organisation = yield organisationModel_1.default.find();
        return res.json({
            message: "Organisation found",
            data: organisation,
        });
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.getOrganisation = getOrganisation;
const getCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organisation = yield candidateModel_1.default.find();
        return res.json({
            message: "Organisation found",
            data: organisation,
        });
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.getCandidates = getCandidates;
const getOrganisationMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organisation = yield organisationModel_1.default
            .findById(req.params.id)
            .populate({ path: "user", options: { sort: { createdAt: -1 } } });
        return res.status(200).json({
            message: "Organisation Members found",
            data: organisation,
        });
    }
    catch (err) {
        return res.status(404).json({ message: `Error: ${err}` });
    }
});
exports.getOrganisationMembers = getOrganisationMembers;
