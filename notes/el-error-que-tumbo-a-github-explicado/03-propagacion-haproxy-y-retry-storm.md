# 03 · Propagación: HAProxy, autenticación y la tormenta de reintentos

## Por qué se extendió tanto

- HAProxy es un *reverse proxy*: distribuye el tráfico a los servicios de GitHub, uno de los puntos de entrada principales; su caída hizo que el error fuera tan extendido [`6:21`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=381)
- Llegó a afectar a la **autenticación**: si el sistema no sabe quién sos, la mayoría de acciones acaban fallando [`6:21`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=381)

## Retry storm

- Los clientes (CLI, API, VS Code) empezaron a ver errores y, como es habitual, reintentan tras X segundos [`6:53`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=413)
- Un «ejército de procesos» reintentando cada 1-3 segundos vuelve a mandar todo el tráfico, que vuelve a fallar y se vuelve a reintentar: GitHub lo llama **retry storm** [`6:53`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=413) [`7:29`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=449)
- Esto dejó al descubierto un **bug en VS Code** en su sistema de reintentos [`7:29`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=449)

## Línea temporal (UTC)

- Problemas detectándose desde las **13:40**; causa identificada a las **16:36** [`7:29`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=449)
- Recuperación completa no hasta las **21:15**: ~4 horas más después de identificar la causa [`8:02`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=482)
