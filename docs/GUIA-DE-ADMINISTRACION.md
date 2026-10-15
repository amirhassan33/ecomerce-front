# Lúmina · Guía de administración

Guía de uso para la persona responsable del catálogo y de la consulta de pedidos.

**Tienda:** [tienda.desarrollowebamir.com.ar](https://tienda.desarrollowebamir.com.ar/)

## 1. Ingresar al panel

1. Abrí la tienda y elegí **Ingresar**.
2. Iniciá sesión con tu cuenta administradora.
3. Elegí **Administración**. En algunos tamaños de pantalla puede mostrarse con un icono.
4. También podés acceder a `/admin/dashboard/products` desde el dominio de la tienda.

El panel requiere una cuenta con permisos de administrador. Crear una cuenta nueva no concede esos permisos. Si no aparece el acceso, solicitá al responsable técnico que revise el rol de tu usuario.

## 2. Cargar un producto

1. Dentro del panel, abrí **Productos**.
2. Elegí **Nuevo producto**.
3. Completá el nombre, la descripción, el precio y el stock.
4. Seleccioná una foto del producto.
5. Enviá el formulario y esperá la confirmación.
6. Volvé al catálogo para comprobar cómo quedó publicado.

| Campo       | Cómo completarlo                                                       |
| ----------- | ---------------------------------------------------------------------- |
| Nombre      | Un título claro, por ejemplo «Vela aromática de vainilla».             |
| Descripción | Aroma, presentación, materiales y características reales del producto. |
| Precio      | Importe numérico. La tienda presenta los precios en pesos argentinos.  |
| Stock       | Cantidad de unidades disponibles para vender.                          |
| Imagen      | Una foto JPG, PNG o WebP de hasta 5 MB.                                |

Usá fotos nítidas, con buena luz y un encuadre consistente entre productos. Revisá especialmente el precio antes de guardar: ingresar `2` significa dos pesos, no dos mil.

## 3. Editar precio, descripción o stock

1. Abrí **Productos** en Administración.
2. Buscá el artículo en la tabla y elegí la acción de edición.
3. Modificá los campos necesarios.
4. Guardá y verificá el resultado en la tienda.

Para cambiar una foto, seleccioná una nueva imagen al editar. Si no necesitás cambiarla, conservá la existente.

Para un producto temporalmente agotado, colocá el stock en **0**. Las tarjetas del catálogo muestran **Sin stock** y deshabilitan el botón de agregar de ese producto.

## 4. Eliminar un producto

Desde la tabla de productos, utilizá la acción de eliminación del artículo correspondiente y atendé cualquier confirmación que aparezca.

La eliminación cambia el catálogo. Si solamente querés dejar de vender un producto por un tiempo, ajustá su stock a cero en lugar de eliminarlo.

## 5. Consultar los pedidos

Abrí **Pedidos** dentro de Administración, o accedé a `/admin/dashboard/orders`.

Cada pedido muestra su identificación, fecha, estado, datos del cliente, dirección de envío, productos, cantidades e importe total.

| Estado     | Qué significa para la consulta                    |
| ---------- | ------------------------------------------------- |
| Pendiente  | Todavía no hay una aprobación de pago registrada. |
| En proceso | El pago continúa en procesamiento.                |
| Aprobado   | El pedido tiene registrado un pago aprobado.      |
| Rechazado  | El pago fue rechazado.                            |
| Cancelado  | El pedido figura cancelado.                       |

Antes de preparar una entrega, contrastá el pedido y el pago en Mercado Pago. Si hay una diferencia de estado, pedí una revisión técnica del webhook. El panel actual permite consultar estos datos; no incluye controles para cambiar manualmente estados de pago ni gestionar despachos.

## 6. Recorrido del comprador

1. Explora el catálogo y utiliza la búsqueda o los filtros.
2. Consulta un producto y agrega unidades al carrito.
3. Inicia sesión o crea una cuenta para continuar con el checkout.
4. Completa sus datos de contacto y dirección de envío.
5. Continúa hacia Mercado Pago para pagar.
6. Puede consultar sus pedidos desde su cuenta.

Los resultados de pago pueden ser aprobado, pendiente o fallido. La confirmación se procesa mediante la integración del backend con el proveedor de pagos.

## 7. Revisiones habituales

- Confirmá precios y disponibilidad cuando cambie el catálogo.
- Revisá las fotos desde un celular y una computadora.
- Consultá los pedidos y sus estados antes de preparar entregas.
- Comprobá los datos de contacto y envío de cada pedido.

## 8. Si algo no aparece como esperabas

| Situación                                      | Qué hacer                                                                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| No ves un producto recién guardado             | Recargá la tienda y limpiá la búsqueda y los filtros. Comprobá que administrás el mismo ambiente.                           |
| Solo ves productos de prueba en tu computadora | Consultá al responsable técnico por la base de datos local. Eso no demuestra que se hayan borrado los productos publicados. |
| Falta una foto                                 | Revisá la imagen desde la edición del producto y volvé a cargarla si corresponde.                                           |
| No podés ingresar                              | Usá la recuperación de contraseña o solicitá revisión del acceso.                                                           |
| Un cliente pagó pero el pedido sigue pendiente | Compará con Mercado Pago y enviá al responsable técnico la identificación del pedido.                                       |

Para informar un problema, indicá la dirección de la página, la acción que realizaste, el mensaje recibido y la hora aproximada. Si enviás una captura, evitá incluir datos personales de clientes que no sean necesarios.

## 9. Cambios de marca y diseño

La carga de productos se realiza desde el panel. El nombre de la tienda, textos institucionales, navegación, estilos y mensajes del carrusel se modifican en el código del proyecto y requieren una actualización técnica.

Esta guía describe las funciones presentes en el código revisado. La configuración de cada ambiente puede afectar la disponibilidad de correos, imágenes y pagos.
