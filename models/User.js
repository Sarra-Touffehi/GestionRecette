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
}, { timestamps: true });
//const User = mongoose.model('User', userSchema);
//module.exports = User;
export default mongoose.model('User', userSchema);

