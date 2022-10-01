/** @format */

import { Router } from "express";
import Handlers from "../controlers/handler.js";

const router = Router();

router.post("/", Handlers.default);
router.get("*", Handlers.default);
export default router;
