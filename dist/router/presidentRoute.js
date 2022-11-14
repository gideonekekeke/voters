"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const presidentController_1 = require("../controller/presidentController");
const router = express_1.default.Router();
router.route("/:id/create").post(presidentController_1.createPresident);
router.route("/view").get(presidentController_1.readPresident);
router.route("/view/candidate").get(presidentController_1.readCandidate);
router.route("/:id/view").get(presidentController_1.readPresidentFromUsers);
exports.default = router;
