# API Blog Personnel - Express.js

## Description

Cette API Express.js propose un système de gestion de blog personnel comprenant :

* gestion des utilisateurs avec authentification JWT
* gestion des articles
* gestion des catégories
* gestion des commentaires
* pagination
* recherche textuelle

**Aucune librairie ORM** n’est utilisée (requêtes SQL manuelles via un client PostgreSQL ou MySQL).

---

## Fonctionnalités

* Authentification JWT
* CRUD complet sur les articles
* CRUD complet sur les catégories
* Gestion des commentaires
* Pagination des résultats
* Recherche textuelle des articles (par titre et contenu)
* Sécurisation des routes protégées

---

## Stack technique

* Node.js 18+
* Express.js
* PostgreSQL ou MySQL
* JWT (jsonwebtoken)
* bcrypt
* pg ou mysql2 (pas d’ORM)

---

## Installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/votre-utilisateur/api-blog-expressjs.git
cd api-blog-expressjs
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer la base de données**
   Créer un fichier `.env` à la racine :

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=blogdb

JWT_SECRET=VOTRE_SECRET
JWT_EXPIRES_IN=3600
```

4. **Lancer les migrations** (si besoin, via script SQL manuel que tu auras écrit)

5. **Démarrer le serveur**

```bash
npm start
```

---

## Endpoints principaux

* `POST /api/auth/register` : inscription utilisateur
* `POST /api/auth/login` : connexion utilisateur
* `GET /api/articles` : lister les articles avec pagination
* `GET /api/articles/search?q=motcle` : rechercher des articles
* `GET /api/articles/:id` : consulter un article
* `POST /api/articles` : créer un article
* `PUT /api/articles/:id` : mettre à jour un article
* `DELETE /api/articles/:id` : supprimer un article
* `GET /api/categories` : lister les catégories
* `POST /api/comments` : ajouter un commentaire
* `GET /api/articles/:id/comments` : lister les commentaires d’un article

---

## Tests

Tu peux ajouter des tests avec Jest ou Mocha :

```bash
npm run test
```

---

## Sécurité

* Authentification JWT
* Hash des mots de passe avec bcrypt
* Validation stricte des entrées (par exemple avec express-validator)

---

## Contribuer

1. Forker le projet
2. Créer une branche
3. Soumettre une pull request

---

## License

MIT License

---
