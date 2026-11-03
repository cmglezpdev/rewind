# 01 · Contexto del incidente

## Qué pasó a nivel de usuario

- GitHub estuvo caído más de 8 horas: fallaban el 20% de las peticiones a la web y a la API, y el 50% de las descargas de ficheros [`0:00`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=0)
- Afectó a prácticamente el 100% de la infraestructura: webhooks, peticiones a la API, etc. Inicio crítico el 17 de agosto a las 2:58 [`0:33`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=33)
- Escala: más de 180 millones de usuarios activos; muchas empresas dependen de GitHub no solo para repos sino para CI/CD y despliegues automatizados [`1:04`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=64)

## Contexto de confianza

- GitHub viene de una mala racha: solo en julio tuvo 8 incidentes; la broma es que es «la primera tecnológica en llegar a un solo nueve de disponibilidad» y los usuarios pierden confianza [`1:32`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=92)
- La fecha del incidente es el 17 de agosto de 2026; causa principal: un problema de configuración en la escalabilidad de un sistema distribuido [`2:02`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=122)
- Factor de fondo: con la IA el código se genera mucho más rápido y la infraestructura de GitHub, pensada para ingestar código escrito por humanos, no aguanta el nuevo tráfico [`2:34`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=154)
