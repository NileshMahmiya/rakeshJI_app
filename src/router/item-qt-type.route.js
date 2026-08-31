import express from "express";

const quantityTypeRouter = express.Router()

import { createQuantityType, fetchAllQuantityTypes, fetchSingleQuantityType, updateQuantityType, deleteQuantityType , createBulkQuantityTypes} from "../controller/item-qt-type.controller.js";


quantityTypeRouter.post("/create-quantity-type", createQuantityType);

quantityTypeRouter.get("/get-all-quantity-types", fetchAllQuantityTypes);

quantityTypeRouter.get("/get-quantity-type/:id", fetchSingleQuantityType);

quantityTypeRouter.put("/update-quantity-type/:id", updateQuantityType);

quantityTypeRouter.delete("/delete-quantity-type/:id", deleteQuantityType);

quantityTypeRouter.post("/create-bulk", createBulkQuantityTypes)


export default quantityTypeRouter