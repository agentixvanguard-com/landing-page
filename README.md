# AgentixVanguard - Landing Page

Landing page del proyecto **AgentixVanguard**. SPA construida con React, Vite y Tailwind CSS. El backend se conecta vía SDK (Base44).

## Estructura

```
landing-page/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── api/           # Cliente API (agentixVanguardClient)
│   ├── components/
│   ├── lib/
│   └── ...
├── vercel.json        # Configuración Vercel (build + SPA rewrites)
├── vite.config.js
├── package.json
└── README.md
```

## Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube el repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio.
3. **Root Directory:** deja el root del repo.
4. **Build:** Vercel detecta Vite; si no, usa `npm run build` y directorio de salida `dist` (definidos en `vercel.json`).
5. **Variables de entorno** (si aplica): en Settings → Environment Variables añade por ejemplo:
   - `VITE_AGENTIXVANGUARD_APP_ID`
   - `VITE_AGENTIXVANGUARD_APP_BASE_URL`
   - `VITE_AGENTIXVANGUARD_FUNCTIONS_VERSION`
6. **Deploy**. Cada push a la rama principal puede desplegar automáticamente.

### Opción 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Desde la raíz del proyecto. Las variables de entorno se pueden configurar en el dashboard de Vercel o con `vercel env`.

## Prueba local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

Build de producción:

```bash
npm run build
npm run preview
```

## Variables de entorno

Para conectar con el backend, configura (en `.env` o en Vercel):

- `VITE_AGENTIXVANGUARD_APP_ID` – ID de la app en el backend
- `VITE_AGENTIXVANGUARD_APP_BASE_URL` – URL base del backend
- `VITE_AGENTIXVANGUARD_FUNCTIONS_VERSION` – Versión de funciones (p. ej. `prod`)
