"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const socialSecVoter_1 = require("../../controller/voters/socialSecVoter");
router.route("/:id/:voterID/create").post(socialSecVoter_1.createVote);
// router.route("/:id/:voterID").delete(deleteVote);
router.route("/view").get(socialSecVoter_1.readVote);
router.route("/:id/view").get(socialSecVoter_1.readYourVoters);
exports.default = router;
