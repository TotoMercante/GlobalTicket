# GlobalTicket - Aplicación Web

La aplicación Web de GlobalTicket permite acceder a todas las funcionalidades de la aplicación mediante una interfaz gráfica unificada. Todos los tipos de usuarios pueden acceder a sus funciones a través de la aplicación Web.

## Estructura de páginas

La aplicación cuenta con las siguientes rutas

```
/                              # Página de inicio
/<id-evento>                   # Detalles de evento
/<id-evento>/comprar/<fecha>   # Página de compra
/<id-evento>/editar            # Edición de evento
/mis-eventos                   # Gestión de eventos

/perfil                        # Página de perfil de usuario
/perfil/editar                 # Edición de perfil
/solicitud-manager             # Formulario de solicitud de permisos de Manager

/entradas/<id-entrada>         # Detalles de entrada
/staff                         # Validación de entradas

/admin/users                   # Gestión de usuarios
/admin/solicitudes-manager     # Gestión de solicitudes de permisos de Manager
```

En todas las páginas, se muestra una barra superior con:

- El nombre de la aplicación.
- Un menú para ver la información de sesión del usuario. Este menú incluye opciones para iniciar o cerrar sesión, ver el perfil del usuario, y ver los eventos propios publicados.

### Búsqueda y gestión de eventos

- **`/` (página de inicio):** Muestra los eventos publicados. Permite una búsqueda simple basada en texto y por rango de fechas.
- **`/<id-evento>`:** Muestra la información completa del evento seleccionado. También muestra las fechas disponibles y permite navegar a la página de compra.
- **`/<id-evento>/comprar/<fecha>`:** Permite la compra de una entrada mediante Mercado Pago.
- **`/<id-evento>/editar`:** Permite modificar la información del evento.
- **`/mis-eventos`:** Muestra los eventos publicados.

### Gestión del perfil

- **`/perfil`:** Muestra la información completa del usuario y las entradas compradas.
- **`/perfil/editar`:** Permite modificar información del perfil de usuario.
- **`/solcitud-manager`:** Muestra un formulario para obtener los permisos de Manager.

### Gestión de entradas

- **`/entradas/<id-entrada>`:** Muestra los detalles de la entrada y el código QR para validarla. Permite transferir la entrada a otro usuario.
- **`/staff`:** Permite escanear el código QR de una entrada para ver detalles de la misma.

### Portal Administrativo

- **`/admin/users`:** Muestra los usuarios de la aplicación. Permite crear, modificar y eliminar usuarios.
- **`/admin/solicitudes-manager`:** Muestra las solicitudes pendientes, y permite aceptar o rechazar cada una.
