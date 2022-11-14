"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socialSecretaryController_1 = require("../controller/socialSecretaryController");
const router = express_1.default.Router();
router.route("/:id/create").post(socialSecretaryController_1.createPresident);
router.route("/view").get(socialSecretaryController_1.readPresident);
router.route("/:id/view").get(socialSecretaryController_1.readPresidentFromUsers);
exports.default = router;
