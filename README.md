Test Front-End ReactJs + Backend Nodejs
Ce projet est une application Node/React qui permettant de créer/modifier/supprimer/afficher les blogs 
💻 Installation
Pour installer l'application, suivez ces étapes :
Clonez le projet de GitHub sur votre ordinateur local.
Accédez au répertoire du projet et exécutez npm install et npm install pour les deux projets.
Télechargez MongoBd via ce lien: https://www.mongodb.com/try/download/community
Démarrez le serveur de développement en exécutant npm start(back) et npm run dev(Front) en même 
temps, avec la commande mongod dans un autre terminale


🔬 Documentation

API :
------------ AUTH ----------- 
POST /api/auth/login connexion
PUT /api/auth/register créer un compte

------------ BLOG ----------- 
GET /api/blogs
Cet api renvoie une liste de tous les blogs. Chaque blog a  les propriétés suivantes :
id : L'identifiant unique.
title : titre de blog.
content  : contenu de blog.
tags : tags de blog.
category : categorie de blog.
image : -
POST /api/blogs Cette api permet de créer un blog
PUT /api/blogs/id Cette api permet de modifier un blog
DELETE /api/blogs/id Cette api permet de supprimer un blog
GET /api/blogs/id Cette api permet de retourner un blog par id

pages :
Sur la page d'accueil, les blogs sont affichés sous forme de cartes avec une pagination et une barre de recherche.
Lorsqu'on clique sur "Read More", la page des détails du blog s'affiche.
Depuis cette interface, il est possible de modifier ou supprimer le blog.
Une formulaire est également disponible pour la création d'un blog.
