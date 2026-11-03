# 4. Prueba autónoma: investigación + desarrollo web

## El experimento

- Herramienta usada: **Kimi Code** (CLI de Moonshot, equivalente a Claude Code, aunque más parecido a Codex). [`9:37`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=577)
- Prompt: investigar la historia de los maratones de los últimos 100 años y construir una web con gráficas y toda la información estructurada. [`10:01`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=601)
- Ejecutado en **modo YOLO** (autónomo, sin pedir confirmación en ningún paso). [`10:30`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=630)
- Duración total: **más de 1 hora y cuarto** de trabajo autónomo. [`9:37`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=577) [`13:17`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=797)

## Modo "agent swarm" (enjambre de agentes)

- Kimi Code tiene un modo en el que despliega **múltiples subagentes en paralelo**, cada uno encargado de una tarea concreta. [`10:30`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=630)
- No es exclusivo de Kimi (otras herramientas también tienen subagentes), pero destaca porque en algunas tareas puede llegar a crear **decenas o incluso ~50-100 subagentes**. [`11:01`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=661)
- Recopilación de 100 años de datos de maratones (resultados, ritmos, ganadores) tomó **30 minutos** de forma autónoma. [`11:41`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=701)

## Modo QA autónomo

- Tras construir la web (HTML/CSS/JS), el modelo entra en un **modo QA**: abre la propia página en el navegador y revisa que todo funcione (responsive, gráficas, datos). [`12:13`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=733)
- Detecta errores reales (gráficas que no cargaban, secciones rotas) y los **arregla iterando solo**, hasta dejarlo terminado. [`12:49`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=769)
- El autor destaca este nivel de autoverificación como algo que le sorprendió positivamente. [`12:49`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=769)

## Resultado

- Web generada en inglés por defecto; tradujo todo al español con un segundo prompt. [`13:17`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=797)
- Incluye evolución histórica de tiempos de maratón (por sexo, por carrera), ritmo por kilómetro, comparativa primera vs. segunda mitad de carrera (fenómeno **"negative split"**), ranking de países ganadores por año. [`13:43`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=823) [`14:09`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=849) [`14:40`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=880)
- Error de datos detectado: no unificó "Kenia" y "Ken" como el mismo país. [`14:40`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=880)

## Calidad del código (sin indicaciones de stack en el prompt)

**HTML/CSS:**
- Semántica aceptable pero mejorable (abuso de `div`, algún estilo inline innecesario pudiendo estar en CSS). [`15:25`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=925)
- CSS de buen nivel: sistema de diseño, custom properties, funciones como `clamp()`. [`16:57`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1017)
- Algunas prácticas antiguas: media queries clásicas en vez de container queries / parent selector (`:has()`). [`17:31`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1051)
- Accesibilidad: buen contraste, respeta `prefers-reduced-motion`, usa `aria-label` en algunos puntos — sin llegar a un tratamiento exhaustivo. [`18:08`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1088)

**JavaScript — el punto más flojo, sorpresa negativa del autor:**
- Estructura anticuada: funciones autoinvocadas (IIFE), uso de `var`. [`15:47`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=947)
- Uso extendido de `window` global. [`15:47`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=947)
- Nombres de variables poco claros; podría haberse estructurado en clases/módulos y con menos tokens reutilizando código. [`16:29`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=989) [`18:32`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1112)

## Conclusión del autor sobre esta prueba

- El modelo prioriza ser **pragmático y cumplir la tarea** por encima de aplicar mejores prácticas de código, salvo que se le pida explícitamente. [`18:32`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1112)
- No entró automáticamente en un "modo plan" para un proyecto grande, algo que otras herramientas sí hacen. [`18:58`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1138)
- Recomendación: no dar por hecho que el output será excelente en prácticas de código sin pedirlo explícitamente en el prompt. [`18:58`](https://www.youtube.com/watch?v=DpP2tq74gf4&t=1138)
