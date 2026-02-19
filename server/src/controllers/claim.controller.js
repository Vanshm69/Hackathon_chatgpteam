import {
  createClaimService,
  approveClaimService,
  rejectClaimService,
  getMyClaimsService,
  getClaimsForItemService
} from "../services/claim.service.js";

export const createClaim = async (req, res) => {
  try {
    const { itemId, answer } = req.body;

    const claim = await createClaimService(
      itemId,
      answer,
      req.user
    );

    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const approveClaim = async (req, res) => {
  try {
    await approveClaimService(req.params.id, req.user);
    res.json({ message: "Claim approved successfully" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const rejectClaim = async (req, res) => {
  try {
    await rejectClaimService(req.params.id, req.user);
    res.json({ message: "Claim rejected successfully" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const getMyClaims = async (req, res) => {
  try {
    const claims = await getMyClaimsService(req.user.id);
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClaimsForItem = async (req, res) => {
  try {
    const claims = await getClaimsForItemService(
      req.params.itemId,
      req.user
    );
    res.json(claims);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};