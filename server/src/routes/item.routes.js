import express from "express";
import { createItem, deleteItem, getItemById, getItems, updateItemStatus } from "../controllers/item.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",authenticateUser,createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.patch("/:id/status", authenticateUser, updateItemStatus);
router.delete("/:id", authenticateUser, deleteItem);

export default router;
