import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/*
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
*/
// Fonction d'inscription
export const register = async (req, res) => {
  try {
    const { nom, email, motdepasse } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      nom,
      email,
      motdepasse: hashedPassword,
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


