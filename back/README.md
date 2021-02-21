# Madera
Madera API

## Start server
`npm run dev`

## Generate migration
`npm run pmig`

## Generate Prisma client
`npm run pgen`

## TODO
* Créer les fichiers qui stockeront les handlers
* Créer le handler du `onRequest` pour la validation du JWT
* Gérer l'auth de l'admin / commercial (voir pour gérer sous forme de middleware)
* Passer la lib sous cette forme -> /back/lib/core, /back/lib/entities