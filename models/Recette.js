import mongoose from 'mongoose';
//import autoIncrement from 'mongoose-auto-increment';
//import mongooseSequence from 'mongoose-sequence';

const { Schema } = mongoose;
//autoIncrement.initialize(mongoose.connection);

const recetteSchema=new Schema({
   /* recetteId: {
        type: Number,
        unique: true,
        required: false
    },*/
    nom:{
        type: String,
        required:true
    },
    ingredients:{
        type: [String],
        required:true
    },

instructions:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    //stocker les références des comments dans le modèle de user,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentaire',
        }]
})
//// Ajouter le plugin d'auto-incrémentation au schéma
//recetteSchema.plugin(autoIncrement.plugin, { model: 'Recette', field: 'recetteId', startAt: 1 });


// Ajouter le plugin mongoose-sequence
//recetteSchema.plugin(mongooseSequence(mongoose), { inc_field: 'recetteId' });

export default mongoose.model("Recette",recetteSchema)