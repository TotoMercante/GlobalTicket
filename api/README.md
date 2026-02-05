# GlobalTicket - Servidor

El servidor de GlobalTicket se encarga de gestionar los datos que se reciben y muestran en la aplicación Web.

Un usuario de la aplicación **no debería** utilizar la API directamente. Todas las funciones son accesibles desde la aplicación Web.

## Herramientas utilizadas

- **NestJS:** Framework base
- **MongoDB:** Base de datos
- **Auth0:** Vinculación de usuarios con la aplicación Web.
- **Swagger:** Especificación de la API y documentación web.

## Estructura básica del proyecto

- **`/user`:** Incluye un CRUD completo de los usuarios para los administradores.
- **`/event`:** Incluye un CRUD completo de los eventos.
- **`/event-ticket`:** Incluye métodos para ver y crear entradas, y para transferir una entrada a otro usuario.
- **`/profile`:** Incluye métodos para ver y modificar el perfil del usuario autenticado, y para registrar el perfil de usuario.
- **`/manager-request`:** Incluye un CRUD completo de las solicitudes de permisos de Manager.
- **`/auth`:** Implementa la autenticación del usuario mediante JWT.
