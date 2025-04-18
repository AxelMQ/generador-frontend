# 🎨 Generador de Frontend - Angular

Este proyecto es el **frontend** de una herramienta que permite generar interfaces web automáticamente a partir de componentes clásicos como botones, inputs, textos, etc. Está desarrollado con **Angular** y diseñado para ser compatible con HTML, CSS y Angular Components.

---

## 🚀 ¿Qué hace este proyecto?

- Permite definir visualmente una interfaz con componentes web.
- Envía esa definición al backend para generar el código HTML, CSS y un componente Angular.
- Visualiza el código generado directamente en pantalla.
- (Próximamente) Permitir descargar o importar el componente en otros proyectos Angular.

---

## 🧱 Tecnologías usadas

- ⚙️ Angular CLI 19.2.7
- 🌐 HTML & CSS
- 📦 TypeScript
- 🔁 Comunicación con Backend REST usando `HttpClient`

---

## 📁 Estructura del Proyecto

src/
├── app/
│   ├── core/                     # Servicios globales, interceptores, utilidades
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── constants.ts
│   │
│   ├── shared/                   # Componentes, pipes y directivas reutilizables
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── shared.module.ts
│   │
│   ├── features/                 # Módulos por funcionalidad (estructura escalable)
│   │   ├── generator/            # Generador de código HTML/CSS compatible con Angular
│   │   │   ├── components/       # Componentes visuales dentro del generador
│   │   │   ├── pages/            # Vistas (pantallas) relacionadas al generador
│   │   │   ├── services/         # Servicios de comunicación con el backend
│   │   │   └── generator.module.ts
│   │   │
│   │   ├── projects/             # Gestión de proyectos (crear, editar, listar)
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── projects.module.ts
│   │   │
│   │   └── auth/                 # (Opcional) Autenticación y registro de usuarios
│   │
│   ├── app-routing.module.ts     # Rutas globales de la aplicación
│   └── app.module.ts             # Módulo raíz del proyecto
│
├── assets/                       # Imágenes, íconos, fuentes u otros recursos estáticos
├── environments/                 # Variables de entorno (dev/prod)
├── index.html                    # Documento HTML principal
├── main.ts                       # Punto de entrada de la app Angular
└── styles.css                    # Estilos globales de la aplicación



---

## ⚙️ Scripts útiles

### Iniciar servidor local

bash
ng serve

---

##  📌 Estado del proyecto

- ✅ Estructura Angular generada
- ✅ Interfaz visual inicial
- 🚧 Conexión funcional con backend
- 🚧 Render dinámico de código generado
- 🧠 Posible integración con bocetos/imágenes (Plus)

---

##  🧑‍💻 Autor
- Axel Alexander Mamani Quispia
- 📍 Santa Cruz, Bolivia
- 🎓 Estudiante de Ingeniería Informática - UAGRM