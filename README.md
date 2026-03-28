# Mis Recetas

Aplicación front-end de recetas en español construida con **Next.js** (App Router), con diseño en tonos rosa bebé y neutros.

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

```
/app
  page.tsx              → Página de inicio
  categoria/[slug]/     → Listado por categoría
  receta/[category]/[index]/ → Detalle de receta
/components
  Navbar.tsx
  DifficultyBadge.tsx
/lib
  data.ts               → Carga de datos
  utils.ts              → Utilidades (escalado, formato)
/Data
  data.JSON             → Recetas (READ-ONLY)
/public
  files/sample.png      → Imagen de plato por defecto
/styles
  globals.css
```

## Características

- **Inicio**: Navegación por categorías (Desayunos, Comidas principales, Postres, Sopas, Ensaladas)
- **Categoría**: Búsqueda, ordenación y filtrado por dificultad
- **Detalle de receta**:
  - Escalado por número de comensales
  - Escalado por cantidad de un ingrediente (ancla)
  - Restablecer cantidades
  - Recomendaciones (si aplica)

## Notas

- Los datos se leen desde `Data/data.JSON`. No se modifica el JSON.
- El escalado de cantidades es temporal (solo en estado del componente).
- Al recargar o navegar, se muestran siempre los valores originales.
