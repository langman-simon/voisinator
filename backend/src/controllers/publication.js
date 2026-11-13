import * as publicationModel from "../models/publication.js";
import * as publicationService from "../services/geolocalisation.js"
import { pool } from "../database/db.js";

const addPublication = async (req, res) => {
  const {
    userId, 
    categoryId, 
    title, 
    description, 
    eventStartAt, 
    eventEndAt, 
    eventAddress, 
    maxParticipants, 
    coverImage
  } = req.body;

  if (!userId || !categoryId || !title || !eventStartAt || !eventEndAt || !eventAddress) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  try {
    const coords = await publicationService.getGeocodeFromAdress(eventAddress);
    if (!coords) {
      return res.status(400).json({ error: "Adresse introuvable" });
    }

    const publication = await publicationModel.createPublication(pool, {
      userId, 
      categoryId, 
      title, 
      description, 
      eventStartAt, 
      eventEndAt,
      eventAddress,
      longitude : coords.longitude, 
      latitude : coords.latitude, 
      maxParticipants, 
      coverImage
    });
    return res.status(201).json(publication);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export {addPublication}