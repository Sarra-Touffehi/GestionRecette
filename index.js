///soit changer l'extension du fichier en .cjs, soit mettre à jour la syntaxe
/// pour utiliser import à la place de require.

import express from "express";
import mongoose from 'mongoose';
import router from "./routes/RecetteRoutes.js";
import routerCommentaire from"./routes/CommentaireRoutes.js";
import userRoute from './routes/UserRoutes.js'; 

const app=express()
//activer middleware qui est responsable de la gestion des données JSON envoyées dans le corps des requêtes HTTP.
app.use(express.json());

const port = 3000;
//http://localhost:3000/api/recette(à tester avec postman)
app.use('/api/recette',router)

//http://localhost:3000/api/commentaire(à tester avec postman)
app.use('/api/commentaire',routerCommentaire)

//app.use('/users/:userId/commentaires',routerCommentaire)


//http://localhost:3000/api/user(à tester avec postman)
app.use('/api/user',userRoute)

//connexion à la base
mongoose.connect("mongodb://127.0.0.1:27017/GestionRecette")
.then(() => {
    console.log("Connexion à la base de données établie avec succès");
   

  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error);
  });


  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });