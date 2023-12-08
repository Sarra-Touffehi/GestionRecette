import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentaireSchema=new Schema({
   
    texte:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true,
        default: Date.now //définir la date courante par défaut
    },
    //stocker la référence de user  dans le modèle du comment
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    recette:{type:mongoose.Schema.Types.ObjectId, ref:'Recette'}

})

export default mongoose.model("Commentaire",commentaireSchema)