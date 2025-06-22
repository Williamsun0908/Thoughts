import { getAllWritings, getWritingsByGoogleId ,getWritingById, createWriting, updateWriting, deleteWriting, searchWritings } from "../controllers/writingConrollers.js";
import express from "express"

const router = express.Router()

router.get("/", getAllWritings)
router.get("/search", searchWritings)
router.get("/:id", getWritingById)
router.post("/",createWriting)
router.put("/:id",updateWriting)
router.delete("/:id", deleteWriting)
router.get("/profile/:googleId",getWritingsByGoogleId)

export default router