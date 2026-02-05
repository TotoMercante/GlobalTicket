# GlobalTicket - App de venta de entradas

## Contenidos

- [Descripción general](#descripción-general)
- [Tipos de usuarios](#tipos-de-usuarios)
- [Instalación y uso](#instalación-y-uso)
- [Herramientas utilizadas](#herramientas-utilizadas)
- [Véase también](#vease-también)

## Descripción general

GlobalTicket es una plataforma para publicar y vender entradas de eventos de distintos tipos. Permite a los organizadores crear y gestionar eventos, a los usuarios comprar y transferir entradas, y al personal validar accesos mediante códigos QR tras la confirmación de pago.

## Tipos de usuarios

GlobalTicket cuenta con los siguientes tipos de usuarios:

- **Estándar:** Es el usuario base de la aplicación. Puede buscar eventos y comprar/transferir entradas.
- **Manager:** Tiene todos los permisos del usuario Estándar, y además puede publicar y editar eventos.
- **Staff:** Solo puede validar entradas mediante códigos QR.
- **Administrador:** Puede gestionar usuarios y responder a solicitudes de permisos de Manager.

## Instalación y uso

La aplicación solo puede utilizarse de forma local.

### Instalación

Solo se permite la instalación directa, es decir:

1. Clonar o descargar el repositorio.
2. Instalar las dependencias de cada subproyecto (`api` y `web`).

### Ejecución

Ambos proyectos se deben ejecutar manualmente en modo desarrollo.

Desde el directorio de cada proyecto, ejecutar

```bash
# ./api
npm run start

# ./web
npm run dev
```

## Herramientas utilizadas

- **Next.js:** Framework base para la aplicación Web.
- **NestJS:** Frameword base para el servidor backend.
- **Auth0:** Servidor de autenticación y registro de usuarios.

## Vease también

- **['web'](web/README.md):** Aplicación Web
- **['api'](api/README.md):** Aplicación backend
