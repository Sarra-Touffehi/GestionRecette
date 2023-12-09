import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nom: {
        type: String,
    },
    email: {
        type: String,
    },
    motdepasse: {
        type: String,
    },
//stocker les références des comments dans le modèle de user,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentaire',
        }]
},
 { timestamps: true });

export default mongoose.model('User', userSchema);

