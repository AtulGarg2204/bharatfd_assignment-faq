import express from "express";
import {
  Create_FAQ,
  Delete_Faq,
  GetAllFaqs,
  Update_Faq,
} from "../controllers/FAQ.js";
const router = express.Router();
router.post("/postfaq", Create_FAQ);
router.get("/", GetAllFaqs);
router.put("/:id", Update_Faq);
router.delete("/:id", Delete_Faq);
export default router;
