# conseil de la prof

- composant général pour les écrans vides, on remonte le bouton au dessus du texte central;

- utiliser
  "Font Awesome" : https://docs.fontawesome.com/web/use-with/react-native;
  ou
  "React Native Vector Icons" : https://github.com/oblador/react-native-vector-icons;

pour les icônes génériques;

- utiliser "react navigation" pour la barre de navigation;

- DateTime Picker pour la gestion des dates;

- Garder les messages d'erreur et infobulles aux mêmes endroit pour la compatibilité des composants;

- Utiliser "Google fonts" pour gérer la typologie;

- regarder le fonctionnement des "Kits UI" pour gérer correctement les composants de base, sinon on devra créer nos propres composants;

- pour le capteur de locations on peux utiliser "Location" : https://docs.expo.dev/versions/latest/sdk/location/;

- on autorise un seul ajout d'images par events, je laisse le bouton ajouter pour montrer ce qu'il y a sans;

- pour la bio du profil, champ adaptatif;

- remplacer l'affichage des astuces par autre chose car cela casse le display de la page et peut poser problème avec les composants, je propose de réutiliser le composant banner pour cela ou bien on ne met pas d'astuces;

# docker command and .env content

docker run --name postgres -e POSTGRES_PASSWORD=mdp -e POSTGRES_USER=user -e POSTGRES_DB=postgres -p 3002:5432 -d postgres

DB_USER=user
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=mdp
DB_PORT=3002

# question prof

- programmation orienté objet ou programmation fonctionnelle (requête)
- structure git ?
