import express from "express";
import Recette from "../models/Recette.js";

const router = express.Router();
import { getAllRecettes,addRecette,getRecetteById,updateRecette,deleteRecette } from "../controllers/recetteController.js";
const app=express()

router.route("/")
    .get(getAllRecettes)
    .post(addRecette);

router.route("/:id")
    .get(getRecetteById)
    .put(updateRecette)
    .delete(deleteRecette);
export default router;
