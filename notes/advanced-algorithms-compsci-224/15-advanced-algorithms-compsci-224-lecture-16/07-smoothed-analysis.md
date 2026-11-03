# 7. Smoothed analysis — why simplex is fast in practice

## Motivation

- Simplex works well in practice; a theoretician wants an explanation for why it beats the provable exponential bound ([`46:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2811)).
- The explanation offered is **not** a claim about exactly what happens in practice, but it shows simplex is not as hard as it looks ([`47:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2837)).
- Due to **Spielman and Teng**, who introduced smoothed analysis; it has since been applied in other areas ([`46:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2811), [`47:41`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2861)).

## Three analysis regimes

| Regime | What it assumes | Weakness |
| --- | --- | --- |
| Worst case | Nothing — fast on every input ([`48:03`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2883)) | Too pessimistic for simplex |
| Average case | An input distribution; bound expected running time under it ([`48:35`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2915)) | You must guess the distribution, which may be unrealistic or unknown ([`48:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2931)) |
| **Smoothed** | Worst-case input + small random perturbation; a middle ground ([`48:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2931)) | — |

## The smoothed model

1. An adversary hands you a **worst-case** instance (e.g. a worst-case LP) ([`49:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2947)).
2. Add independent **Gaussian noise**, mean zero and very small variance, to every entry of `A`, of `b`, and of the cost vector ([`49:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2947), [`49:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2991)).
3. Bound the **expected** running time on this randomly perturbed worst-case instance ([`49:29`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2969), [`49:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2991)).

Quantifiers stated precisely: there is an algorithm `A` such that **for all** inputs `x`, `E[runtime of A on x̃]` is small, where the expectation is over `x̃`, a randomly perturbed version of `x` ([`49:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2991), [`50:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3057)).

## The result

- **Spielman and Teng showed that simplex, with a particular pivot rule they analyzed, runs in polynomial time under smoothed analysis** ([`49:29`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2969)).
- The bound is **not** independent of the variance — it is polynomial in the variance as well ([`50:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3057)).
- Aside for students: these historical tangents are fair game as project ideas ([`48:03`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2883)).
