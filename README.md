# Lúmina · Ecommerce de velas y aromas

Aplicación web para presentar un catálogo, administrar productos y recibir compras mediante una integración con Mercado Pago. Incluye una tienda adaptable a distintos tamaños de pantalla, cuentas de usuario, carrito y un panel de administración.

**Tienda publicada:** [tienda.desarrollowebamir.com.ar](https://tienda.desarrollowebamir.com.ar/)

## Documentación

- [Guía de administración](docs/GUIA-DE-ADMINISTRACION.md): uso cotidiano de productos, stock y pedidos.
- Este README: arquitectura, instalación, configuración y mantenimiento técnico.

## Funciones del proyecto

| Área           | Funciones                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Catálogo       | Fotos, nombres, descripciones, precios, disponibilidad y detalle de cada producto.                                                             |
| Exploración    | Búsqueda por nombre, filtros de precio y stock, ordenamiento y paginación.                                                                     |
| Presentación   | Carrusel con navegación manual y táctil; rotación automática cada cinco segundos, con pausas de interacción y respeto por movimiento reducido. |
| Usuarios       | Registro, inicio y cierre de sesión, recuperación y restablecimiento de contraseña.                                                            |
| Compra         | Carrito, cantidades, datos de contacto y envío, creación de pedido y redirección a Mercado Pago.                                               |
| Seguimiento    | Historial del comprador y pantallas para resultados de pago aprobado, pendiente y fallido.                                                     |
| Administración | Creación, edición y eliminación de productos; consulta de pedidos, estados y datos de envío.                                                   |

La integración de pagos requiere credenciales y configuración del proveedor. La presencia de una pantalla de éxito por sí sola no sustituye la confirmación del pago en el backend.

## Tecnologías

| Capa                       | Tecnologías                                        |
| -------------------------- | -------------------------------------------------- |
| Interfaz                   | JavaScript, React 18, React Router y Vite.         |
| Estilos                    | Tailwind CSS, daisyUI y CSS propio.                |
| Formularios y solicitudes  | React Hook Form, Axios y React Hot Toast.          |
| Servidor                   | Node.js 24, Express 5 y JavaScript con módulos ES. |
| Persistencia               | MongoDB y Mongoose.                                |
| Autenticación y validación | JSON Web Tokens, cookies, bcryptjs y Zod.          |
| Integraciones              | Mercado Pago, Cloudinary y Resend.                 |
| Publicación                | Vercel; dominio propio para la tienda.             |

## Arquitectura

El navegador ejecuta el frontend React. Este consulta una API Express para obtener productos, autenticar usuarios, gestionar el carrito y crear pedidos. El backend consulta MongoDB, gestiona las imágenes con Cloudinary e integra el proceso de pago con Mercado Pago. Las notificaciones de pago llegan al backend mediante un webhook. El envío de correos utiliza Resend cuando está configurado.

El frontend y el backend tienen configuraciones y despliegues independientes. Los datos pertenecen a la base de datos conectada al backend; no están incluidos en la compilación del frontend.

## Estructura

La carpeta principal del proyecto contiene `FRONT` y `BACK`. Este README se guarda dentro de `FRONT`.

| Ubicación                         | Contenido                                                           |
| --------------------------------- | ------------------------------------------------------------------- |
| `FRONT/src/pages`                 | Tienda, autenticación, checkout, productos y administración.        |
| `FRONT/src/components`            | Navegación, tarjetas, carrusel, carrito y componentes compartidos.  |
| `FRONT/src/context`               | Estado de usuarios, productos y carrito.                            |
| `FRONT/src/services`              | Solicitudes a la API.                                               |
| `FRONT/src/config/storeConfig.js` | Nombre, mensajes de marca y beneficios de la tienda.                |
| `BACK/src/routes`                 | Rutas de autenticación, productos, carrito, pedidos y webhook.      |
| `BACK/src/controllers`            | Lógica de las solicitudes y de las integraciones.                   |
| `BACK/src/config`                 | Conexión y configuración de servicios.                              |
| `BACK/src/middleware`             | Controles de acceso, validación de solicitudes y carga de imágenes. |
| `BACK/tests`                      | Pruebas automatizadas del backend.                                  |

## Requisitos

- Node.js 24 y npm. El backend declara compatibilidad con Node.js `>=24 <25`.
- Acceso a una base MongoDB para el ambiente elegido.
- Configuración de Cloudinary para cargar imágenes.
- Configuración de Mercado Pago para probar el pago completo.
- Configuración de Resend para las funciones de correo.

## Configuración local

En `FRONT/.env`, definir la dirección de la API, incluyendo `/api`:

```dotenv
VITE_BACKEND_URL=http://localhost:3001/api
```

En `BACK/.env`, configurar las variables utilizadas por los servicios. La siguiente tabla contiene nombres, no valores del proyecto:

| Variables                                                              | Uso                                                                                             |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `PORT`                                                                 | Puerto del servidor; el código usa `3001` por defecto.                                          |
| `FRONTEND_URL`                                                         | Origen permitido del frontend, por ejemplo `http://localhost:5173` en desarrollo.               |
| `MONGO_DB_URI`                                                         | URI de MongoDB. El código admite los marcadores `<db_username>`, `<db_password>` y `<db_name>`. |
| `MONGO_DB_USER`, `MONGO_DB_PASSWORD`, `MONGO_DB_NAME`                  | Usuario, contraseña y nombre de la base de datos.                                               |
| `JWT_SECRET`                                                           | Firma de los tokens de autenticación.                                                           |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cuenta y credenciales para imágenes.                                                            |
| `MP_ACCESS_TOKEN`                                                      | Credencial del backend para Mercado Pago.                                                       |
| `MERCADOPAGO_WEBHOOK_SECRET`                                           | Configuración de validación del webhook.                                                        |
| `MERCADOPAGO_WEBHOOK_STRICT`                                           | Activa el modo estricto cuando su valor es `true`; revisar el controlador antes de cambiarlo.   |
| `MERCADOPAGO_COLLECTOR_ID`                                             | Identificación de la cuenta receptora para la validación del pago.                              |
| `RESEND_API_KEY`, `EMAIL_FROM`                                         | Servicio y remitente de correos.                                                                |
| `EMAIL_RECOVERY_SECRET`                                                | Autorización de la ruta interna de recuperación de correos.                                     |
| `NODE_ENV`                                                             | Ambiente de ejecución; el comando `start` del backend establece `production`.                   |

Las variables con prefijo `VITE_` se incorporan al código del navegador. Las credenciales de servicios corresponden al backend. Los archivos `.env` no forman parte de esta documentación.

### Iniciar el backend

Desde la carpeta principal, abrir una terminal:

```powershell
cd BACK
npm ci
npm run dev
```

El servidor intenta conectarse a MongoDB antes de escuchar solicitudes. Con la configuración local habitual, informa `Server is running on port 3001` cuando el inicio termina correctamente.

### Iniciar el frontend

En otra terminal, también desde la carpeta principal:

```powershell
cd FRONT
npm ci
npm run dev
```

Abrir la dirección indicada por Vite. Normalmente es `http://localhost:5173`. Mantener ambas terminales abiertas durante el desarrollo. Si Vite utiliza otro puerto, revisar también el origen permitido por el backend.

## Comandos

| Carpeta | Comando           | Resultado                                  |
| ------- | ----------------- | ------------------------------------------ |
| `FRONT` | `npm run dev`     | Servidor de desarrollo.                    |
| `FRONT` | `npm run build`   | Compilación de producción en `dist`.       |
| `FRONT` | `npm run preview` | Revisión local de la compilación generada. |
| `FRONT` | `npm run lint`    | Revisión estática de código.               |
| `BACK`  | `npm run dev`     | Servidor con observación de cambios.       |
| `BACK`  | `npm start`       | Inicio con `NODE_ENV=production`.          |
| `BACK`  | `npm test`        | Suite de pruebas mediante `node --test`.   |

Los comandos describen las herramientas disponibles; esta documentación no certifica la ejecución completa de las pruebas ni una compra real.

## Rutas principales

| Ruta del frontend                             | Pantalla                                 |
| --------------------------------------------- | ---------------------------------------- |
| `/`                                           | Inicio y catálogo.                       |
| `/detailProduct/:id`                          | Detalle de producto.                     |
| `/register`, `/login`                         | Registro e ingreso.                      |
| `/forgot-password`, `/reset-password/:token`  | Recuperación de acceso.                  |
| `/checkout`                                   | Datos de compra; requiere autenticación. |
| `/orders`                                     | Pedidos del usuario autenticado.         |
| `/admin/dashboard/products`                   | Administración del catálogo.             |
| `/admin/dashboard/products/createProduct`     | Alta de producto.                        |
| `/admin/dashboard/products/updateProduct/:id` | Edición de producto.                     |
| `/admin/dashboard/orders`                     | Consulta administrativa de pedidos.      |

| API                         | Acceso y función                               |
| --------------------------- | ---------------------------------------------- |
| `GET /api/products`         | Catálogo público.                              |
| `GET /api/products/:id`     | Detalle público.                               |
| `POST /api/products`        | Alta; requiere administrador.                  |
| `PUT /api/products/:id`     | Edición; requiere administrador.               |
| `DELETE /api/products/:id`  | Eliminación; requiere administrador.           |
| `/api/auth`                 | Registro, sesión y recuperación de contraseña. |
| `/api/cart`                 | Operaciones de carrito.                        |
| `POST /api/orders/create`   | Creación del pedido; requiere autenticación.   |
| `GET /api/orders/my-orders` | Pedidos propios.                               |
| `GET /api/orders/admin/all` | Pedidos para administración.                   |
| `/api/webhook`              | Recepción de notificaciones de pago.           |

Las altas y ediciones con imagen utilizan `multipart/form-data`; el archivo se envía en el campo `image`. El middleware admite una imagen JPG, PNG o WebP de hasta 5 MB.

## Publicación y mantenimiento

1. Confirmar qué repositorio, rama y carpeta usa cada proyecto de Vercel.
2. Configurar las variables del frontend y del backend en sus respectivos ambientes.
3. Para el frontend, usar la compilación de Vite y el directorio `dist`. El proyecto incluye reglas de reescritura para las rutas de React.
4. Verificar que la URL de API, el origen del frontend y el webhook correspondan al ambiente publicado.
5. Compilar y revisar el cambio antes de hacer commit y push. El despliegue automático depende de la integración configurada en Vercel.
6. Revisar catálogo, imágenes, sesión y recorrido de compra tras la publicación.

Un commit guarda cambios en Git; el despliegue ocurre mediante el flujo configurado de publicación. Los cambios en variables `VITE_` requieren reiniciar Vite en desarrollo o una nueva compilación en producción.

## Diagnóstico rápido

| Síntoma                                                     | Qué revisar                                                                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| La tienda local y la publicada muestran catálogos distintos | `VITE_BACKEND_URL`, backend activo y nombre efectivo de la base MongoDB en cada ambiente.                      |
| Aparece solo un producto de prueba                          | Comprobar la conexión antes de volver a cargar o eliminar productos.                                           |
| Error al cargar productos                                   | Terminal del backend, conexión MongoDB, dirección de API y origen permitido.                                   |
| No aparece una foto                                         | URL de imagen y configuración de Cloudinary; una dirección de ejemplo no representa una foto cargada.          |
| No aparece Administración                                   | Iniciar sesión con una cuenta que tenga el rol de administrador. Registrarse no otorga ese rol.                |
| Un pago figura pendiente                                    | Revisar su estado en Mercado Pago y la recepción del webhook; no confundir la redirección con la confirmación. |

## Alcance

El panel actual permite consultar pedidos y sus estados de pago. No documenta herramientas de despacho, etiquetas de transporte, facturación fiscal, cupones ni reembolsos desde el panel. Estos módulos requieren una revisión o desarrollo específico antes de ofrecerlos como parte de una entrega.
