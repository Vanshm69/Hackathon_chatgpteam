import prisma from "../config/prisma.config.js";

export const createClaimService = async (
  itemId,
  answer,
  claimant
) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId }
  });

  if (!item) throw new Error("Item not found");
  if (item.createdBy === claimant.id)
    throw new Error("Cannot claim your own item");
  if (item.status !== "open")
    throw new Error("Item not available");

  const claim = await prisma.claim.create({
    data: {
      itemId,
      answer,
      claimantId: claimant.id
    }
  });

  await prisma.item.update({
    where: { id: itemId },
    data: { status: "claimed" }
  });

  return claim;
};

export const approveClaimService = async (
  claimId,
  currentUser
) => {
  const claim = await prisma.claim.findUnique({
    where: { id: claimId },
    include: { item: true }
  });

  if (!claim) throw new Error("Claim not found");
  if (claim.item.createdBy !== currentUser.id)
    throw new Error("Not authorized");

  await prisma.claim.update({
    where: { id: claimId },
    data: { status: "approved" }
  });

  await prisma.item.update({
    where: { id: claim.itemId },
    data: { status: "resolved" }
  });

  return true;
};

export const rejectClaimService = async (
  claimId,
  currentUser
) => {
  const claim = await prisma.claim.findUnique({
    where: { id: claimId },
    include: { item: true }
  });

  if (!claim) throw new Error("Claim not found");
  if (claim.item.createdBy !== currentUser.id)
    throw new Error("Not authorized");

  await prisma.claim.update({
    where: { id: claimId },
    data: { status: "rejected" }
  });

  await prisma.item.update({
    where: { id: claim.itemId },
    data: { status: "open" }
  });

  return true;
};
export const getMyClaimsService = async (userId) => {
  return prisma.claim.findMany({
    where: { claimantId: userId },
    include: { item: true },
    orderBy: { createdAt: "desc" }
  });
};

export const getClaimsForItemService = async (
  itemId,
  currentUser
) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId }
  });

  if (!item) throw new Error("Item not found");

  if (item.createdBy !== currentUser.id)
    throw new Error("Not authorized");

  return prisma.claim.findMany({
    where: { itemId },
    include: { claimant: true }
  });
};