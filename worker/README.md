# Proxy de análisis con Claude — Cloudflare Workers

Este Worker guarda la API key de Anthropic del lado del servidor. El sitio en
GitHub Pages solo le envía el texto de las preguntas y recibe de vuelta el JSON
con los temas; la clave nunca llega al navegador de los alumnos.

## Despliegue (una sola vez)

1. Instala Wrangler y entra a tu cuenta de Cloudflare:

   ```bash
   npm install -g wrangler
   ```

   ```bash
   wrangler login
   ```

2. Edita `worker.js` y reemplaza `https://TU-USUARIO.github.io` en
   `ALLOWED_ORIGINS` por el dominio real del sitio. **Si no lo haces, el
   navegador bloqueará todas las peticiones por CORS.**

3. Guarda la API key como secreto cifrado (pégala cuando la pida; no queda en
   ningún archivo del repositorio):

   ```bash
   wrangler secret put ANTHROPIC_API_KEY
   ```

4. Publica el Worker:

   ```bash
   wrangler deploy
   ```

5. Copia la URL que imprime Wrangler (algo como
   `https://agente-estudio-proxy.TU-CUENTA.workers.dev`) y pégala en la
   constante `WORKER_URL` de `../app.js`.

## Comprobación rápida

```bash
curl -i -X POST https://TU-WORKER.workers.dev -H "Origin: https://TU-USUARIO.github.io" -H "content-type: application/json" -d "{\"curso\":\"Microeconomía\",\"tipoEvaluacion\":\"Prueba\",\"preguntas\":[\"Calcule el excedente del consumidor si la demanda es Qd = 100 - 2P.\",\"Determine la elasticidad precio de la demanda en el equilibrio.\",\"Explique cómo se desplaza la curva de oferta ante un alza de costos.\"]}"
```

Debe responder `200` con `temas_clave`, `resumen_evaluacion` y
`sugerencia_estudio`. Sin la cabecera `Origin` correcta responde `403`.

Para ver los errores en vivo mientras pruebas:

```bash
wrangler tail
```

## Qué controla el Worker

| Control | Valor por defecto | Dónde se cambia |
|---|---|---|
| Orígenes permitidos (CORS) | tu dominio de GitHub Pages + localhost | `ALLOWED_ORIGINS` |
| Modelo | `claude-haiku-4-5` | `ANTHROPIC_MODEL` |
| Preguntas por llamada | 120 | `MAX_QUESTIONS` |
| Caracteres por llamada | 18.000 | `MAX_CHARS` |
| Tamaño máximo del cuerpo | 60 KB | `MAX_BODY_BYTES` |
| Solicitudes por IP | 12 por minuto | `RATE_LIMIT` |

## Límites que conviene tener presentes

- El límite por IP usa la Cache API, que es **por centro de datos de
  Cloudflare**: alguien que reparta las peticiones entre varias regiones puede
  superarlo. Sirve como tope de cortesía, no como defensa contra abuso decidido.
- La lista de orígenes la aplica **el navegador**, no la red: un `curl` con la
  cabecera `Origin` falsificada llega igual al Worker. Los topes de tamaño y de
  frecuencia son la protección real del gasto.
- Si el sitio se hace muy popular o alguien abusa del endpoint, las opciones
  siguientes son poner el Worker detrás de Cloudflare Access, exigir un token
  compartido rotado, o mover el análisis a un backend con cuentas de usuario.
- Revisa el gasto en la consola de Anthropic las primeras semanas; con
  `claude-haiku-4-5` y estos topes cada análisis cuesta una fracción de centavo,
  pero el endpoint es público.
