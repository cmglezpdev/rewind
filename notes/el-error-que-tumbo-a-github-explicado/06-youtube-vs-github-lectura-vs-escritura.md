# 06 · ¿Por qué YouTube no se cae y GitHub sí? Lectura vs escritura

- En Twitter se comparó la caída de GitHub (atribuida al volumen de IA) con YouTube, que también ingesta muchísimo contenido hecho con IA sin caerse; el autor pide comparaciones justas: son productos totalmente distintos [`13:22`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=802)
- **YouTube**: producto de **alta lectura**. Ingesta millones de gigas por minuto, pero su problema es la distribución, y tiene dos vías separadas (ingestión vs distribución) que se resuelven con cachés y CDNs [`13:55`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=835)
- **GitHub**: tiene **ambas** cargas: muchísimas escrituras de código nuevas + agentes de IA leyendo repos constantemente, publicando webs, autenticándose con sistemas de GitHub, etc. [`13:55`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=835)
- El autor remite a su vídeo sobre sistemas de alta lectura vs alta escritura [`14:39`](https://www.youtube.com/watch?v=h5of8RrGLeE&t=879)

| | YouTube | GitHub |
|---|---|---|
| Carga dominante | Lectura | Lectura **y** escritura |
| Ingestión vs distribución | Separadas, cacheables (CDN) | Mezcladas |
| Nuevo tráfico IA | Vídeos/shorts generados | Escrituras de código + agentes leyendo + auth de agentes |
