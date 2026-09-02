import { addList, fetchAllLists, fetchSingleList, updateList,deleteList,justListTitle } from "../controller/samgriList.controller.js";
import express from "express";

const samagriListRouter = express.Router()



samagriListRouter.post("/add-list", addList)
samagriListRouter.get("/get-all", fetchAllLists)
samagriListRouter.get("/get-single/:id", fetchSingleList)
samagriListRouter.put("/update-list/:id", updateList)
samagriListRouter.delete("/delete-list/:id", deleteList)
samagriListRouter.get("/get-title", justListTitle)




export default samagriListRouter