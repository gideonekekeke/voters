"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organisationController_1 = require("../controller/organisationController");
const router = express_1.default.Router();
router.route("/create").post(organisationController_1.createOrganisation);
router.route("/").get(organisationController_1.getOrganisation);
router.route("/candidates").get(organisationController_1.getCandidates);
router.route("/:id/view").get(organisationController_1.getOrganisationMembers);
exports.default = router;
