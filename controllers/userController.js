import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/*
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
*/


// Inscrire user
export const register = async (req, res) => {
  try {
    const { nom, email, motdepasse } = req.body;

    //verifier si l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    //hasher le mot de passe
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    //créer newuser
    const newUser = new User({
      nom,
      email,
      motdepasse: hashedPassword,
    });

   
    await newUser.save();

    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


//se connecter
export const login = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    //verifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    //verifier si le mot de passe est correct
    //bcrypt.compare utilisé pour comparer le mot de passe fourni avec le mot de passe haché dans la base de données 
    const isPasswordCorrect = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un jeton JWT
    const token = jwt.sign({ email: user.email, userId: user._id }, 'votre_clé_secrète', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;  
    const { nom, email, motdepasse } = req.body;

    //verifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    //mettre à jour les champs du profil 
    if (nom) {
      user.nom = nom;
    }

    if (email) {
      user.email = email;
    }

    if (motdepasse) {
      //hasher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(motdepasse, 10);
      user.motdepasse = hashedPassword;
    }

    
    await user.save();

    res.status(200).json({ message: 'Profil mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


