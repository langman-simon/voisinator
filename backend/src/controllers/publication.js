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
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  try {
    const coords = await publicationService.getGeocodeFromAdress(eventAddress);
    if (!coords) {
      return res.status(400).json({ message: "Adresse introuvable" });
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

const patchPublication = async (req, res) => {
  const id = Number(req.params.id);
  /*We never know what can happens..*/
  if(!Number.isInteger(id) || id <= 0) return res.status(400).json({message: "Identifiant invalide"});

  const {
    categoryId,
    title,
    description,
    eventStartAt,
    eventEndAt,
    eventAddress,
    maxParticipants,
    coverImage
  } = req.body;

  try {
    const publication = await publicationModel.findPublicationById(pool, {
      id,
    });

    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    /*Will be undefined if no changes --> keep the last address*/
    let longitude;
    let latitude;

    /*Need it if the user want to change the address, have to recalculate it*/
    if (eventAddress != null && eventAddress !== publication.event_address) {
      const coords = await publicationService.getGeocodeFromAdress(eventAddress);
      if (!coords) {
        return res.status(400).json({ message: "Adresse introuvable" });
      }
      longitude = coords.longitude;
      latitude = coords.latitude;
    }

    await publicationModel.updatePublication(pool, {
        id,
        categoryId,
        title,
        description,
        eventStartAt,
        eventEndAt,
        longitude,
        latitude,
        eventAddress,
        maxParticipants,
        coverImage
    });
    return res.status(200).json({ message: "Publication mise à jour !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

const deletePublication = async (req, res) => {
  /*Same as patch*/
  const id  = Number(req.params.id);
  if(!Number.isInteger(id) || id <= 0) return res.status(400).json({message: "Identifiant invalide"});

  try {
    const publication = await publicationModel.findPublicationById(pool, {
      id,
    });

    if (!publication) {
      return res.status(404).json({ message: "Publication introuvable" });
    }
    await publicationModel.deletePublication(pool, { id });
    return res.status(200).json({ message: "Publication supprimée" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

const findPublicationById = async(req, res) => {
  /*Same as patch*/
  const id  = Number(req.params.id);
  if(!Number.isInteger(id) || id <= 0) return res.status(400).json({message: "Identifiant invalide"});
  
  try{
    const publication = await publicationModel.findPublicationById(pool, {id});
    if(!publication) return res.status(404).json({message: "Publication introuvable"});
    return res.status(200).json(publication);
  } catch(error){
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

const findPublicationsByTitle = async(req, res) => {
    const title = req.params.title;
    try{
    const publication = await publicationModel.findPublicationsByTitle(pool, {title});
    if(!publication) return res.status(404).json({message: "Publication introuvable"});
    return res.status(200).json(publication);
  } catch(error){
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

const findPublicationByUserId = async(req, res) => {
  /*Same as patch*/
  const userId  = Number(req.params.userId);
  if(!Number.isInteger(userId) || userId <= 0) return res.status(400).json({message: "Identifiant invalide"});
  
  try{
    const publication = await publicationModel.findPublicationsByUserId(pool, {userId});
    if(!publication) return res.status(404).json({message: "Publication introuvable"});
    return res.status(200).json(publication);
  } catch(error){
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

const findPublicationByCategoryId = async(req, res) => {
  /*Same as patch*/
  const categoryId  = Number(req.params.categoryId);
  if(!Number.isInteger(categoryId) || categoryId <= 0) return res.status(400).json({message: "Identifiant invalide"});
  
  try{
    const publication = await publicationModel.findPublicationByCategoryId(pool, {categoryId});
    if(!publication) return res.status(404).json({message: "Publication introuvable"});
    return res.status(200).json(publication);
  } catch(error){
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

const findPublicationsByRadius = async(req, res) => {
  const {
    latitude, 
    longitude, 
    kmRadius
  } = req.body;

  try{
    const publications = await publicationModel.findPublicationsByRadius(pool, {latitude, longitude, kmRadius});
    if(!publications) return res.status(404).json({message: "Aucun évènement dans votre rayon de recherche"});
    return res.status(200).json(publications);
  } catch(error){
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}



export {addPublication, patchPublication, deletePublication, findPublicationById, findPublicationsByTitle, findPublicationByUserId, findPublicationByCategoryId, findPublicationsByRadius}