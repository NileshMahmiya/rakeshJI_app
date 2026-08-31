import express from "express";
import { createSamagriItem, fetchAllSamagriItems, fetchSingleSamagriItem, updateSamagriItem, deleteSamagriItem , createMultipleSamagriItems } from "../controller/samagri-item.controller.js";

const samagriItemsRouter = express.Router()


samagriItemsRouter.post("/create-samagri-items", createSamagriItem);



samagriItemsRouter.get("/get-all-items", fetchAllSamagriItems);


samagriItemsRouter.get("/get-item/:id", fetchSingleSamagriItem);



samagriItemsRouter.put("/update-item/:id", updateSamagriItem);



samagriItemsRouter.delete("/delete-item/:id", deleteSamagriItem)

samagriItemsRouter.post("/create-multiple", createMultipleSamagriItems)

export default samagriItemsRouter;

