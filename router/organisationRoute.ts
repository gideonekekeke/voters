import express, { Router } from "express";
import {
  createOrganisation,
  getCandidates,
  getOrganisation,
  getOrganisationMembers,
} from "../controller/organisationController";

const router: Router = express.Router();

router.route("/create").post(createOrganisation);

router.route("/").get(getOrganisation);
router.route("/candidates").get(getCandidates);
router.route("/:id/view").get(getOrganisationMembers);

export default router;
