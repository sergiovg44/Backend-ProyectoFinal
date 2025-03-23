# Proyecto-Final Backend

## Descripción

Este es el backend de una aplicación web musical, donde los usuarios pueden explorar una
lista de canciones y consultar los detalles de cada una. La plataforma permite el registro
y login de usuarios, quienes podrán agregar y eliminar canciones de sus favoritos,
editar su perfil (incluyendo imagen de usuario) y enviar mensajes mediante un formulario de contacto.

Funciones principales:

- Listado de canciones y detalle individual.
- Buscar canciones del listado mediante un buscador
- Registro e inicio de sesión de usuarios.
- Gestión de canciones favoritas.
- Edición del usuario (nombre, apellidos, contraseña e imagen).
- Eliminar usuario
- Sección de contacto para enviar datos al equipo.

Este backend expone una API REST desarrollada en Node.js, consumida por un frontend (repositorio separado).

##  Tecnologías utilizadas

- Node.js
- Express
- Mongoose
- JWT (jsonwebtoken)
- Multer
- Nodemailer
- Cloudinary
- Dotenv
- Cors
- Bcrypt

##  Instalación y ejecución

### . Clonar repositorio

```
Frontend

git clone https://github.com/sergiovg44/Frontend-ProyectoFinal.git

Backend

git clone https://github.com/sergiovg44/Backend-ProyectoFinal.git

```

### 2. Instalar dependencias

- npm install

### 3. Iniciar servidor de desarrollo

- npm run dev

### 4. Endpoints utilizados

Los endpoints que utilizamos en este proyecto son los siguientes:

| Método | Endpoint                         | Descripción                            | Autenticación |
|--------|----------------------------------|----------------------------------------|---------------|
| POST   | /user/login                      | Iniciar sesión                         |  No           |
| POST   | /user/register                   | Registrar nuevo usuario                |  No           |
| GET    | /song/songs                      | Obtener lista de canciones             |  No           |
| GET    | /song/songs/:idSong              | Obtener detalle de una canción         |  No           |
| POST   | /user/contact                    | Enviar mensaje de contacto             |  No           |
| POST   | /user/favourite/:idSong          | Agregar canción a favoritos            |  Sí           |
| DELETE | /user/favourite/:idSong          | Eliminar canción de favoritos          |  Sí           |
| GET    | /user                            | Obtener perfil de usuario              |  Sí           |
| PATCH  | /user                            | Actualizar datos de usuario            |  Sí           |
| PATCH  | /user/imageProfile               | Actualizar imagen de perfil            |  Sí           |
| DELETE | /user                            | Eliminar cuenta de usuario             |  Sí           |


##  Autor

- Sergio

## Perfil de github

- sergiovg44

##  Licencia
- Este proyecto está bajo la licencia MIT.