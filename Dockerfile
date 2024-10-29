# Utiliser une image légère de Node.js
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /srv/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape pour l'exécution
FROM node:20-alpine AS runner

# Définir le répertoire de travail
WORKDIR /srv/app

# Copier les fichiers de l'étape de construction
COPY --from=builder /srv/app ./

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
