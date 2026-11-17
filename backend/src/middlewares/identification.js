import {pool} from '../../database/db.js';
import {readuser} from '../';

export const authBasic = async (req, res, next) => {
    //1. récupérer le header authorization
    if(/*Vérifier que le header est correct*/){
        //2. décoder le header
        if(/*Vérifier que nous avons bien un id et donc qu'il y a correspondance dans la DB*/){
            //3. Mettre les informations dans l'objet req et appeler la fonction next.
        } else {
            //Code d'erreur envoyé, car aucune correspondance dans la DB
        }
    } else {
        //Code d'erreur envoyé, car pas d'identification basic
    }
}