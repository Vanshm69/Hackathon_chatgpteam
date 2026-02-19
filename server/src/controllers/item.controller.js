import {
  createItemService,
  getItemsService,
  getItemByIdService,
  updateItemStatusService,
  deleteItemService,
} from "../services/item.service.js";

export const createItem = async (req, res) => {
  try {
    const item = await createItemService(req.body, req.user.id);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await getItemsService(req.query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await getItemByIdService(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateItemStatus = async (req, res) => {
  try {
    const updated = await updateItemStatusService(
      req.params.id,
      req.body.status,
      req.user
    );
    res.json(updated);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await deleteItemService(req.params.id, req.user);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};