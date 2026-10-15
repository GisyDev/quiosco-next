# 🛒 Quiosco Next
 
Aplicación web de **pedidos para un quiosco**: los clientes eligen productos por categoría y envían su pedido, y el personal lo gestiona desde un panel de administración. Construida con **Next.js (App Router)**, **Prisma** y **PostgreSQL**.
 
## 📑 Índice
 
- [Funcionalidades](#-funcionalidades)
- [Tecnologías](#-tecnologías)
- [Rutas de la aplicación](#️-rutas-de-la-aplicación)
- [Modelo de datos](#-modelo-de-datos)
- [Flujo de un pedido](#-flujo-de-un-pedido)
- [Estructura del proyecto](#️-estructura-del-proyecto)
- [Puesta en marcha](#-puesta-en-marcha)
- [Scripts](#-scripts)
## ✨ Funcionalidades
 
### Zona pública (productos)
 - Catálogo organizado por **categorías**, con navegación lateral.
- Tarjetas de producto con imagen, nombre y precio.
- **Pedido en curso** con estado global: añadir, quitar y cambiar cantidades.
- Cálculo automático del **total**.
- Confirmación con validación de datos y envío mediante **Server Actions**.

<p align="center">
  <img src="images/pagina-principal.png" width="100%" />
</p>



### Panel de administración
- **Órdenes pendientes** con refresco automático (SWR).
Completar orden con un clic mediante una Server Action.
<p align="center">
  <img src="images/admin-ordenes.png" width="100%" />
</p>


- **Órdenes listas**: pedidos completados.
<p align="center">
  <img src="images/admin-ordenes-listas.png" width="100%" />
</p>

- **Gestión de productos** del catálogo.
<p align="center">
  <img src="images/admin-productos.png" width="100%" />
</p>

- **Añadir un de productos** del catálogo.
<p align="center">
  <img src="images/admin-crear-producto.png" width="100%" />
</p>




## 🧰 Tecnologías 
| Área | Herramienta |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router) + React 19 |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL + [Prisma](https://www.prisma.io) |
| Estado del pedido | [Zustand](https://zustand-demo.pmnd.rs) |
| Datos en el panel | [SWR](https://swr.vercel.app) |
| Validación | [Zod](https://zod.dev) |
| Imágenes | [next-cloudinary](https://next.cloudinary.dev) |
| Notificaciones | react-toastify |
| Iconos | react-icons |
| Estilos | Tailwind CSS 4 |
 
## 🗺️ Rutas de la aplicación
 
| Zona | Ruta | Descripción |
| --- | --- | --- |
| Pública | `/order/[category]` | Productos de una categoría y pedido en curso |
| Admin | `/admin/orders` | Órdenes pendientes de preparar |
| Admin | `/admin/ordersReady` | Órdenes completadas |
| Admin | `/admin/products` | Gestión del catálogo |
 
Endpoints internos que consulta SWR en el panel: `admin/orders/api` y `admin/ordersReady/api`.
 
> Ajusta las rutas si difieren de las reales.
 
## 🧩 Modelo de datos
 
```text
Category 1 ──── * Product * ──── * Order
                         └─ OrderProduct (quantity)
```
 
| Modelo | Descripción |
| --- | --- |
| `Category` | Agrupa los productos del catálogo. |
| `Product` | Nombre, precio, imagen y categoría. |
| `Order` | Pedido del cliente. |
| `OrderProduct` | Producto incluido en un pedido, con su `quantity`. |
 
## 🔄 Flujo de un pedido
 
```text
Cliente confirma ──▶ Pendiente (/admin/orders) ──▶ Lista (/admin/ordersReady)
                          Server Action: completar
```
 
1. El cliente elige una categoría y añade productos (estado en Zustand).
2. Confirma el pedido; una **Server Action** valida con Zod y guarda la orden.
3. El panel la detecta gracias al refresco periódico de SWR.
4. El administrador pulsa **Completar** y la orden pasa a "listas".
## 🗂️ Estructura del proyecto
 
```text
src/
├── app/
│   ├── admin/              # Panel: orders, ordersReady, products (+ api/)
│   └── components/
│       ├── admin/          # Sidebar y tarjetas de orden del panel
│       ├── orders/         # Resumen del pedido
│       ├── products/       # Tarjetas y listado de productos
│       └── ui/             # Componentes reutilizables
├── config/                 # Configuración
├── lib/                    # Utilidades y cliente de base de datos
├── schema/                 # Esquemas de validación (Zod)
├── store/                  # Estado global del pedido (Zustand)
└── types/                  # Tipos compartidos
prisma/                     # Esquema y migraciones
```
 
> Ajusta los nombres de carpeta si tu estructura difiere.
 
## 🚀 Puesta en marcha
 
```bash
git clone https://github.com/GisyDev/quiosco-next.git
cd quiosco-next
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
 
- Tienda: <http://localhost:3000>
- Panel: <http://localhost:3000/admin/orders>
### Variables de entorno
 
Crea un archivo `.env` en la raíz:
 
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/quiosco"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
```
 
## 📜 Scripts
 
| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |
 
## 🔒 Nota de seguridad
 
Si despliegas el panel en producción, protege las rutas `/admin` con autenticación (por ejemplo, con middleware de Next.js).
 
---
 
👩‍💻 Hecho por [GisyDev](https://github.com/GisyDev)