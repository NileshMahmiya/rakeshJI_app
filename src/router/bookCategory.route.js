import express from "express"
import { createBookCategory, updateBookCategory, deleteBookCategory, getAllBookCategories , getBookCategoryById } from "../controller/bookCategory.controller.js"


const bookCategoryRouter = express.Router()

bookCategoryRouter.post("/create-book-category", createBookCategory )
bookCategoryRouter.put("/update-book-category/:id", updateBookCategory)
bookCategoryRouter.delete("/delete-book-category/:id", deleteBookCategory)
bookCategoryRouter.get("/get-all-book-category", getAllBookCategories)
bookCategoryRouter.get("/get-single-book-category/:id", getBookCategoryById)


export default bookCategoryRouter