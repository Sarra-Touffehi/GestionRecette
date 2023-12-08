import Commentaire from "../models/Commentaire.js";
import Recette from "../models/Recette.js";
import User from "../models/User.js";


export const addCommentaire = async (req, res, next) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const {userId} =req.params;
    // Récupérer l'ID de la recette à partir des paramètres de la requête
    const {recetteId} =req.params;

    console.log("req.body :",req.body);
      let newCommentaire=new Commentaire({
          texte:req.body.texte,
          date:req.body.date,
          //ajouter un comment avec l'id de user 
          ///user: userId,
        
});
  // Enregistrez le commentaire dans la base de données
  const savedCommentaire = await newCommentaire.save();

// Vérifier si l'utilisateur existe
  const user = await User.findById(userId);
// Vérifier si la recette  existe

  const recette = await Recette.findById(recetteId);

  if (!user) {
    // Si l'utilisateur n'est pas trouvé, 
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
}

if (!recette) {
  // Si la recette n'est pas trouvé, 
  return res.status(404).json({ error: 'Recette non trouvée' });
}
// Ajouter la référence du commentaire à l'utilisateur
user.comments.push(savedCommentaire._id);
await user.save();


// Ajouter la référence du commentaire à la recette
recette.comments.push(savedCommentaire._id);
await recette.save();

console.log("Commentaire ajouté avec succès");
// Renvoyez les détails du commentaire ajouté dans la réponse
  res.json(savedCommentaire);
} 
catch (error) {
  console.error(error);
  res.status(500).json({ error: "Erreur serveur." });
}

}




export const getAllCommentaires = async(req,res,next)=>{
  let commentaires;
  try{
    const commentaire = await Commentaire.findById(CommentaireId).populate('user', '_id');

    //commentaires = await Commentaire.find().populate('_id');
  }
  catch(err){
      console.log(err);
  
  }
  if(!commentaires){
      return res.status(404).json({message:"No comments found"});
  }
  return res.status(200).json({commentaires});
  }


  export const getCommentaireById = async (req, res, next) => {
    const CommentaireId = req.params.id;
    try {
        const commentaire = await Commentaire.findById(CommentaireId).populate('user', '_id');
        //const commentaire = await Commentaire.findById(CommentaireId).populate('_id');

        if (!commentaire) {
            return res.status(404).json({ message: "Comments not found" });
        }
        return res.status(200).json({ commentaire });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
