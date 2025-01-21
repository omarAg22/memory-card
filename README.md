🎮 Jeu de Mémoire  
Un jeu de cartes mémoire moderne et interactif construit avec React. Testez votre mémoire en associant des paires de cartes tout en gérant vos tentatives dans une limite définie.

## Table des matières

1. Fonctionnalités
2. Règles du jeu
3. Détails techniques
4. Composants
5. Installation
6. Développement
7. Améliorations futures

---

## Fonctionnalités

🎲 Grille de cartes dynamique avec difficulté personnalisable  
⏱️ Système de jeu basé sur un nombre limité de tentatives  
📊 Suivi des performances et du score  
📜 Historique détaillé des parties avec pagination  
📱 Design responsive pour tous les appareils  
🎨 Retour visuel et animations

---

## Règles du jeu

- Toutes les cartes commencent face cachée
- Les joueurs peuvent retourner deux cartes à la fois
- Les paires correspondantes restent face visible
- Les paires non correspondantes se retournent face cachée
- Limite de tentatives = 1,5 × nombre de cartes
- Condition de victoire : Associer toutes les paires dans la limite de tentatives
- Condition de défaite : Dépasser la limite de tentatives avant de compléter le jeu

---

## Détails techniques

**Stack technologique**

- React 18+
- CSS3
- API de stockage local (Local Storage API)

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/omarAg22/memory-card.git

# Installer les dépendances
cd memory-game
npm install

# Lancer le serveur de développement
npm run dev
```

## Développement

Structure du projet

src/  
├── components/  
│ ├── Game/  
│ │ ├── Game.jsx  
│ │ └── Game.css  
│ ├── Card/  
│ │ ├── Card.jsx  
│ │ └── Card.css  
│ └── History/  
│ ├── History.jsx  
│ └── History.css  
└── App.jsx
