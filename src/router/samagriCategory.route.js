import express from "express";

import {
  createSamagriCategory,
  getAllSamagriCategories,
  getSamagriCategoryById,
  updateSamagriCategory,
  deleteSamagriCategory,
} from "../controller/samagriCategory.controller.js";

const samagriCategoryRouter = express.Router();

samagriCategoryRouter.post("/add-samgri-category", createSamagriCategory);

samagriCategoryRouter.get("/get-all-samgri-category", getAllSamagriCategories);

samagriCategoryRouter.get("/get-samagri-category/:id", getSamagriCategoryById);

samagriCategoryRouter.put("/update-samgri-category/:id", updateSamagriCategory);

samagriCategoryRouter.delete("/delete-samgri-category/:id", deleteSamagriCategory);

export default samagriCategoryRouter;