"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const proController_1 = require("../controller/proController");
router.route("/:id/create").post(proController_1.createPresident);
router.route("/view").get(proController_1.readPresident);
router.route("/:id/view").get(proController_1.readPresidentFromUsers);
exports.default = router;
