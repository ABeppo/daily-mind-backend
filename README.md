# DailyMind Backend

Backend de l'application **DailyMind**, un journal personnel avec suivi de l’humeur.

[![Node.js](https://img.shields.io/badge/Node.js-v20.10-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)](https://mongoosejs.com/)

---

## Sommaire
- [Fonctionnalités](#fonctionnalités)
- [Installation](#-installation)
- [Tests](#tests)

---

## 🚀 Fonctionnalités

### Users
- Inscription (`/signup`)
- Connexion (`/signin`)
- Profil utilisateur (`/profile`) : consulter, modifier ou supprimer
- Routes sécurisées par token

### Entries
- CRUD complet (`/entries`)
- Chaque entrée contient :
  - `title` (optionnel)
  - `text`
  - `mood` (`happy`, `neutral`, `sad`, `angry`, `tired`)
  - `userId` (référence vers l’utilisateur)

---

## ⚡ Installation

1. Cloner le dépôt :

```bash
git clone <URL_DU_REPO>
cd daily-mind-backend
```
2. installer les dépendances :

```bash
yarn install
```
3. Créer un fichier .env avec la chaîne de connexion MongoDB :

```bash
</> env
CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster0.mongodb.net/dailyMind?retryWrites=true&w=majority
```
4. Démarrer le serveur :

```bash
yarn start
```
---

## 📌 Tests

- Routes testées avec **Thunder Client**
- Vérification de la connectivité et des collections `users` et `entries`
- Protection des routes avec token
- Mot de passe **non exposé** dans les réponses

---

🔒 Notes

- Les routes sensibles sont sécurisées via token
- Les mots de passe sont hashés avec bcrypt
- Les entries sont séparées dans une collection pour scalabilité
