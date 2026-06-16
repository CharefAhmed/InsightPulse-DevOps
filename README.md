## InsightPulse

InsightPulse est une application web de **sentiment analysis** permettant d'analyser et de visualiser les avis clients de manière intelligente. L'application offre la possibilité d'importer, stocker et traiter les commentaires clients grâce à un modèle d'intelligence artificielle intégré via **Ollama**, capable de classifier chaque avis en sentiment **positif**, **neutre** ou **négatif**.

Le projet est composé d'un backend développé avec **NestJS**, **PostgreSQL** et **Prisma ORM**, ainsi que d'une interface utilisateur moderne réalisée avec **React** et **Chart.js** pour l'affichage interactif des statistiques et des tendances. Parmi les fonctionnalités principales figurent l'authentification sécurisée basée sur **Passport.js** (JWT et Local Strategy), la génération de rapports PDF et le filtrage avancé des données.

L'environnement de développement et de déploiement a été entièrement conteneurisé grâce à **Docker**. Des fichiers **Dockerfile** ont été créés pour les différents services de l'application et un fichier **Docker Compose** permet d'orchestrer facilement l'ensemble de la stack (frontend, backend, base de données et services associés), garantissant une installation rapide et un environnement cohérent sur toutes les machines.
