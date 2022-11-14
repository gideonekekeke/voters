import express, { Router } from "express";
import {
  createPresident,
  readPresident,
  readPresidentFromUsers,
} from "../controller/socialSecretaryController";

const router: Router = express.Router();

router.route("/:id/create").post(createPresident);
router.route("/view").get(readPresident);
router.route("/:id/view").get(readPresidentFromUsers);

export default router;
