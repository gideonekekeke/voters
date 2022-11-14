"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const secVoter_1 = require("../../controller/voters/secVoter");
router.route("/:id/:voterID/create").post(secVoter_1.createVote);
// router.route("/:id/:voterID").delete(deleteVote);
router.route("/view").get(secVoter_1.readVote);
router.route("/:id/view").get(secVoter_1.readYourVoters);
exports.default = router;
