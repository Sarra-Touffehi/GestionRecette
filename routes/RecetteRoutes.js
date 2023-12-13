import express from "express";
import Recette from "../models/Recette.js";

const router = express.Router();
import { getAllRecettes,addRecette,getRecetteById,updateRecette,deleteRecette,getRecettesByUser,postRecettesByUser } from "../controllers/recetteController.js";
const app=express()

router.route("/")
    .get(getAllRecettes)
    .post(addRecette);

router.route("/user/:userId")
    .get(getRecettesByUser)
    .post(postRecettesByUser)
    //app.get('/api/recette/user/:userId', async (req, res) => {
       // app.post('/api/recette/user/:userId'

router.route("/:id")
    .get(getRecetteById)
    .put(updateRecette)
    .delete(deleteRecette);
export default router;
