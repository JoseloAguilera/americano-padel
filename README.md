# Americano de pádel

App simple para generar y anotar torneos americanos de pádel.

## Producción

La app está publicada como sitio estático en Vercel y guarda los torneos en Supabase.

- Pantalla inicial con torneos activos y torneos anteriores.
- Link de administrador para crear torneos y cargar resultados.
- Link público por torneo para compartir solo lectura.
- Guardado de jugadores, partidos, resultados y clasificación.
- Apertura del mismo torneo desde varios teléfonos.
- Actualización automática aproximada cada 3 segundos cuando se cargan resultados.

## Modo administrador y modo público

- El acceso administrador se hace desde `/admin/login`.
- Usuario inicial: `Admin`; contraseña inicial: `12345`. Cambiarla o crear otro usuario más seguro desde el panel admin.
- Al iniciar sesión como admin se pueden crear torneos, cargar resultados, agregar otros usuarios administradores y actualizar la propia contraseña.
- Sin sesión admin, la misma web queda como visitante: solo permite ver clasificación y partidos.
- Supabase también bloquea escrituras sin sesión/token válido; no es solo ocultar botones.

## Supabase

Tabla usada: `public.americano_tournaments`.

La publishable key queda incluida en el frontend porque es una app pública. Las policies de RLS permiten leer torneos públicamente, pero crear/actualizar requiere token de administrador.

## Uso local con servidor Node

```bash
node server.js
```

Abrir `http://localhost:3000` o la IP local que muestra la terminal.

## Tests rápidos

```bash
python -m pytest test_static_contract.py -q
```
