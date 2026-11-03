# Hackeo masivo a wallets frías de Bitcoin

> Capítulo `6:20` – `14:25` · Qué pasó, la causa técnica y el debate legal sobre responsabilidades.

## Qué pasó

- Hackeo masivo de billeteras frías (cold wallets) de Bitcoin: se accedió a fondos en autocustodia por un fallo del hardware al generar la frase semilla [`6:21`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=381) [`6:38`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=398).
- El fallo estaba en el componente que generaba la aleatoriedad, existía desde 2021; el primer parche salió mal y hubo que publicar un segundo [`7:41`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=461).
- Afectó incluso a quienes hicieron todo "bien": wallet nunca conectada a internet, frase semilla anotada en papel, sin actividad durante años — y aun así perdieron los fondos [`11:34`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=694).

## Causa técnica (explicada con la analogía de la baraja)

- Para generar la frase semilla hay que aleatorizar palabras; por un fallo de software, la "bolsa de palabras" efectiva era mucho más pequeña de lo previsto [`13:14`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=794) [`13:39`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=819).
- Analogía: aunque barajes perfectamente, si la baraja tiene solo 5 cartas en vez de la baraja completa, el espacio de combinaciones es diminuto y se rompe por fuerza bruta [`14:04`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=844).

## Debate legal

- ¿Es robo? Sí: hay desplazamiento patrimonial forzando la "caja fuerte" digital; es un delito penal a perseguir [`10:17`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=617).
- Independientemente del delito, si el robo lo propició un producto defectuoso, el usuario podría reclamar responsabilidad civil al fabricante del hardware — analogía: te vendieron una caja fuerte cuyo "dado" para generar la contraseña funcionaba mal [`8:06`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=486) [`10:41`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=641).
- Matices: hay que revisar términos y condiciones (posibles disclaimers, p. ej. si el usuario podía aportar su propia aleatoriedad) y guardar recibos de compra [`8:31`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=511) [`11:06`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=666).
- Contra-analogía: si te tiran la puerta abajo, el fabricante de la puerta no es culpable; sí lo es si "compartió las llaves" (negligencia). Todo depende de cómo ocurrió exactamente [`12:31`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=751) [`12:54`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=774).
- Uno de los tertulianos (abogado con área de cripto) va a buscar afectados: lo ve como posible reclamación masiva contra el proveedor de hardware [`8:31`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=511).

## Implicación para la tesis de autocustodia

- Golpe importante al relato estándar de Bitcoin: ni exchange (no son tus claves), ni hot wallet (hackeable), y ahora tampoco la billetera fría resultó infalible [`11:06`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=666).
- Trade-off: en autocustodia el responsable último eres tú; con custodia de terceros no controlas el activo, pero si hackean al exchange, el exchange responde por el daño [`12:08`](https://www.youtube.com/watch?v=JmPxIbLrb5c&t=728).
