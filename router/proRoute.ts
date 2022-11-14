import express, { Router } from "express";
const router: Router = express.Router();
import {
  createPresident,
  readPresident,
  readPresidentFromUsers,
} from "../controller/proController";

router.route("/:id/create").post(createPresident);
router.route("/view").get(readPresident);
router.route("/:id/view").get(readPresidentFromUsers);

export default router;
