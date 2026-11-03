# 04 · Mitigación: redirigir tráfico y arreglar la configuración

## Por qué tardó 4 horas tras identificar la causa

- Arreglar sistemas distribuidos no es inmediato: hay que actuar paso a paso y primero **aligerar la carga**; el objetivo prioritario fue liberar el tráfico que causaba el destrozo [`8:02`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=482)
- Analogía: no podés desmontar una tubería por la que aún pasa agua a presión sin inundar la casa [`8:37`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=517)

## Acciones de los ingenieros

1. **Redirigir la mayoría del tráfico de Central US a North Virginia** (cambio de región); es sencillo si la infraestructura está preparada [`8:37`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=517)
   - Forma práctica de implementarlo: a nivel DNS, haciendo que el dominio resuelva a las IPs de la otra región [`9:04`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=544)
   - Al mover el tráfico, la mayoría de usuarios empezó a ver recuperación [`9:04`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=544)
2. **Pausar los servidores de HAProxy** y abrir una **pull request** para cambiar la configuración de concurrencia del sidecar de Istio [`9:04`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=544)
3. Al reactivar el tráfico, los servidores ya podrían crecer sin el error [`9:48`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=588)
