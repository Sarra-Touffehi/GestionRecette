import Recette from "../models/Recette.js";
import User from "../models/User.js";
export const getAllRecettes = async(req,res,next)=>{
let recettes;
try{
    // pour récupérer tous les recettes avec leurs commentaires 

recettes = await Recette.find().populate('comments');
}
catch(err){
    console.log(err);

}
if(!recettes){
    return res.status(404).json({message:"No recettes found"});
}
return res.status(200).json({recettes});
}

export const searchRecettes = async (req, res, next) => {
    const searchTerm = req.params.searchTerm;

    try {
        const recettes = await Recette.find({
            nom: { $regex: new RegExp(searchTerm, 'i') }
        });

        return res.status(200).json({ recettes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getRecetteById = async (req, res, next) => {
    const recetteId = req.params.id;

    try {
        //pour récupérer les détails d'un recette avec ses commentaires associés
        const recette = await Recette.findById(recetteId).populate('comments');
        if (!recette) {
            return res.status(404).json({ message: "Recette not found" });
        }
        return res.status(200).json({ recette });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const addRecette = async (req, res, next) => {
    try {
        console.log("req.body :",req.body);
        let newRecette=new Recette({
            nom:req.body.nom,
            ingredients:req.body.ingredients,
            instructions:req.body.instructions,
            image:req.body.image,

        });
        // Enregistrez la recette dans la base de données
    const savedRecette = await newRecette.save();
    console.log("Recette ajouté avec succès");
    // Renvoyez les détails de la recette ajouté dans la réponse
    res.json(savedRecette);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }

}

  export const updateRecette = async (req, res, next) => {
    const recetteId = req.params.id;
    const { nom, ingredients, instructions, image } = req.body;

    try {
        const updatedRecette = await Recette.findByIdAndUpdate(
            recetteId,
            { nom, ingredients, instructions, image },
            { new: true }
        );

        if (!updatedRecette) {
            return res.status(404).json({ message: "Recette not found" });
        }

        return res.status(200).json({ recette: updatedRecette });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }


};

export const deleteRecette = async (req, res, next) => {
    const recetteId = req.params.id;

    try {
        const deletedRecette = await Recette.findByIdAndDelete(recetteId);

        if (!deletedRecette) {
            return res.status(404).json({ message: "Recette not found" });
        }
        console.log(`Recette with ID ${recetteId} deleted successfully`);
        return res.status(204).json();

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



//app.get('/api/recette/user/:userId', async (req, res) => {
    export const getRecettesByUser = async (req, res, next) => {
        const recetteId = req.params.id;

    try {
      console.log(req.params.userId);
    // Rechercher toutes les recettes associées à l'utilisateur spécifié dans la base de données

      const recipes = await Recette.find({ user: req.params.userId });
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  // Ajoutez une route pour créer une recette spécifique à un utilisateur
  /*export const postRecettesByUser = async (req, res) => {
    try {
      const newRecipe = req.body;
      newRecipe.userId = req.params.userId; // Associez la recette à l'utilisateur spécifié dans l'URL
      const recipe = await Recipe.create(newRecipe);
      res.status(201).json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

*/

  // Ajoutez une route pour créer une recette spécifique à un utilisateur

export const postRecettesByUser = async (req, res, next) => {
    try {
      // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
      const {userId} =req.params;
  
      console.log("req.body :",req.body);
        let newRecette=new Recette({
            nom:req.body.nom,
            ingredients:req.body.ingredients,
            instructions:req.body.instructions,
            image:req.body.image,

            
  });
    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, 
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
   // Associer la recette créée avec l'utilisateur
  newRecette.user=user;
// Enregistrez la recette dans la base de données
const savedRecette = await newRecette.save();

 // Ajouter la référence de la recette à l'array 'recettes' de l'utilisateur
user.recettes.push(savedRecette._id);

  // Sauvegarder les modifications apportées à l'utilisateur dans la base de données
await user.save();

  console.log("recette ajouté avec succès");
  // Renvoyez les détails du recette ajouté dans la réponse
    res.json(savedRecette);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
  
  }
  