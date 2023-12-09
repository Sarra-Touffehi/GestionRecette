import express from "express";
import Commentaire from "../models/Commentaire.js";
const router= express.Router({ mergeParams: true });
import { addCommentaire,getAllCommentaires,getCommentaireById } from "../controllers/commentaireController.js";
const app=express()
router.route("/")
    .get(getAllCommentaires)

router.route('/:userId/:recetteId')
.post(addCommentaire)

router.route("/:id")
    .get(getCommentaireById)

    export default router;