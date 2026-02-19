import prisma from "../config/prisma.config.js";

console.log("Item service loaded");

export const createItemService = async (data, userId) => {
  const item = await prisma.item.create({
    data: {
      ...data,
      date: new Date(data.date),
      createdBy: userId
    }
  });

  return item;
};

export const getItemsService = async (filters) => {
  const { type, category, location, status } = filters;

  return prisma.item.findMany({
    where: {
      ...(type && { type }),
      ...(category && { category }),
      ...(location && {
        location: { contains: location, mode: "insensitive" }
      }),
      ...(status && { status })
    },
    orderBy: { createdAt: "desc" }
  });
};

export const getItemByIdService = async (id) => {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      user: true,
      claims: true
    }
  });

  if (!item) throw new Error("Item not found");

  return item;
};

export const updateItemStatusService = async (
  itemId,
  status,
  currentUser
) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId }
  });

  if (!item) throw new Error("Item not found");

  if (
    item.createdBy !== currentUser.id &&
    currentUser.role !== "admin"
  ) {
    throw new Error("Not authorized");
  }

  return prisma.item.update({
    where: { id: itemId },
    data: { status }
  });
};

export const deleteItemService = async (itemId, currentUser) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId }
  });

  if (!item) throw new Error("Item not found");

  if (
    item.createdBy !== currentUser.id &&
    currentUser.role !== "admin"
  ) {
    throw new Error("Not authorized");
  }

  await prisma.item.delete({
    where: { id: itemId }
  });

  return true;
};