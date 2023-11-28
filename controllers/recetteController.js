import Recette from "../models/Recette.js";

export const getAllRecettes = async(req,res,next)=>{
let recettes;
try{
recettes = await Recette.find();
}
catch(err){
    console.log(err);

}
if(!recettes){
    return res.status(404).json({message:"No recettes found"});
}
return res.status(200).json({recettes});
}


export const getRecetteById = async (req, res, next) => {
    const recetteId = req.params.id;

    try {
        const recette = await Recette.findById(recetteId);
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
    const { nom, ingredients, instructions, image } = req.body;
  
    try {
      const newRecette = new Recette({
        nom,
        ingredients,
        instructions,
        image,
      });
  
      const savedRecette = await newRecette.save();
  
      return res.status(201).json({ recette: savedRecette });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };


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