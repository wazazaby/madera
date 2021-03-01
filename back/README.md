# Madera
Madera API

## Start server
`npm run dev`

## Apply migration
`npm run pmd`

## Seed database
`npm run seed`

## Apply && seed
`npm run depseed`

## Generate migration /!\
`npm run pmig`

## Generate Prisma client /!\
`npm run pgen`

## TODO
* Créer les routes clients
* Finir le seed
* Gérer les modules et les quotations


## Contenu .env
Utilisé pour le cryptage des passwords
`SALT_ROUNDS`
URL du frontend pour autorisé les requêtes (CORS)
`FRONT_HOST`
Le port de l'API
`PORT`
Secret pour la signature des JWT
`JWT_SECRET`
DB
`DB_NAME`
`DB_HOST`
`DB_PASSWORD`
`DB_USER`
`DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}`