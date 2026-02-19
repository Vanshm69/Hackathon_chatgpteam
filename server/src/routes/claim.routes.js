import express from "express";
import {
  createClaim,
  approveClaim,
  rejectClaim,
  getMyClaims,
  getClaimsForItem
} from "../controllers/claim.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, createClaim);

router.get("/mine", authenticateUser, getMyClaims);

router.get("/item/:itemId", authenticateUser, getClaimsForItem);

router.patch("/:id/approve", authenticateUser, approveClaim);
router.patch("/:id/reject", authenticateUser, rejectClaim);

export default router;