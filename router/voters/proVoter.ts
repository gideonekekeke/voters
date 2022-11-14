import express, { Router } from "express";
const router: Router = express.Router();

import {
  createVote,
  readVote,
  readYourVoters,
  // deleteVote,
} from "../../controller/voters/proVoter";

router.route("/:id/:voterID/create").post(createVote);
// router.route("/:id/:voterID").delete(deleteVote);
router.route("/view").get(readVote);

router.route("/:id/view").get(readYourVoters);

export default router;
