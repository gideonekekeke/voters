"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("../util/multer"));
const router = express_1.default.Router();
router.route("/create").post(multer_1.default, userController_1.createUser);
router.route("/signin").post(userController_1.signinUser);
router.route("/").get(userController_1.readUsers);
router.route("/:id").get(userController_1.readUser);
router.route("/organisation/:id").get(userController_1.readOrgUsers);
router.route("/:id/token").get(userController_1.VerifiedUser);
// goto view!
// router.route("/:id/view").post(VerifiedUserFinally);
router.route("/:id/verify").post(userController_1.VerifiedUserFinally);
router.route("/:id/:token/changePassword").post(userController_1.changePassword);
router.route("/resetPassword").post(userController_1.resetPassword);
router.route("/search").get(userController_1.searchUser);
router.route("/searchUser").get(userController_1.searchForUser);
router.route("/word/start").get(userController_1.workOut);
exports.default = router;
