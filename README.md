# Americano de pádel

App simple para generar y anotar un torneo americano de pádel.

## Uso local con sincronización en red

```bash
node server.js
```

Abrir `http://localhost:3000` o la IP local que muestra la terminal.

## Deploy Vercel

En Vercel funciona como app estática desde `public/index.html`. En ese modo los datos quedan guardados en el navegador del dispositivo (`localStorage`).

Para sincronización en varios celulares se necesita un backend persistente o hosting PHP/Node con almacenamiento de archivo/DB.
