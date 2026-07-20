<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Corre Servidor

Para correr docker:

1. Instalar docker-desktop

```
https://docs.docker.com/desktop/install/windows-install/
```

2. Abrir el docker-desktop
3. Cambiar el `.env.template` a `.env`
4. Poner el comando:

```
docker-compose up -d
```

5. Levantar el server de nest:

```
npm run start
```

6. Para poder ver las tablas se puede usar TablePlus o PGAdmin.

# Seed

Para llenar la base de datos usar el siguient endpoint:

```
http://localhost:3000/api/seed
```

Esto crea una pequeña base de datos de `Sports` y `Sportfields`.


```
[
  {
    "name": "tenis",
    "images": [
      "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000"
    ]
  },
  {
    "name": "soccer",
    "images": [
      "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000"
    ]
  }
]
```
### Get One Sport
```
http://localhost:3000/api/sports/tenis
```
se cambia el `tenis` por el nombre de otro deporte en ingles y se obtiene:

```
[
  {
    "id": 1,
    "name": "tenis",
    "images": [
      "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000"
    ],
    "sportfields": [
      {
        "id": "cf237097-e501-4b0d-ab06-bb907d8a62ca",
        "name": "tennis pro",
        "images": [
          "https://img.freepik.com/free-vector/sport-fields-isometric-set_1284-24824.jpg"
        ]
      },
      {
        "id": "9d19d086-ba9f-4e25-992a-8956d16e3fa2",
        "name": "tennis always",
        "images": [
          "https://img.freepik.com/free-vector/sport-fields-isometric-set_1284-24824.jpg"
        ]
      }
    ]
  }
]
```

## Sportfields

### Get All Sportfields (todas las canchas)

```
http://localhost:3000/api/sportfields
```
Nos da un json con la siguiente estructura:
```
[
  {
    "id": "9d19d086-ba9f-4e25-992a-8956d16e3fa2",
    "name": "tennis always",
    "description": "Cancha de pasto",
    "dimensions": "40X20",
    "grills": false,
    "locker": false,
    "showers": false,
    "bathrooms": false,
    "restobar": false,
    "parking": true,
    "images": [
      "https://img.freepik.com/free-vector/sport-fields-isometric-set_1284-24824.jpg"
    ],
    "sport": "tenis"
  },
  {
    "id": "cf237097-e501-4b0d-ab06-bb907d8a62ca",
    "name": "tennis pro",
    "description": "Cancha de polvo de ladrillo",
    "dimensions": "40X20",
    "grills": true,
    "locker": true,
    "showers": true,
    "bathrooms": true,
    "restobar": false,
    "parking": false,
    "images": [
      "https://img.freepik.com/free-vector/sport-fields-isometric-set_1284-24824.jpg"
    ],
    "sport": "tenis"
  }
]
```

### Get OneSportfield

Para obtener solo un campo usamos el `id` de este:

```
http://localhost:3000/api/sportfields/9d19d086-ba9f-4e25-992a-8956d16e3fa2
```

Nos da todas las caracteristicas de la cancha en especifico:

```
{
  "id": "9d19d086-ba9f-4e25-992a-8956d16e3fa2",
  "name": "tennis always",
  "description": "Cancha de pasto",
  "dimensions": "40X20",
  "grills": false,
  "locker": false,
  "showers": false,
  "bathrooms": false,
  "restobar": false,
  "parking": true,
  "images": [
    "https://img.freepik.com/free-vector/sport-fields-isometric-set_1284-24824.jpg"
  ]
}
```

## License

Nest is [MIT licensed](LICENSE).
