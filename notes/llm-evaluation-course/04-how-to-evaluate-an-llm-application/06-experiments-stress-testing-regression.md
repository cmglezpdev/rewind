# Experiments, stress-testing & regression testing

Once the evaluation system (datasets + scoring) is in place, it unlocks three workflows.

## Experimental comparisons

- Quickly try different prompts or parameters, test them on your datasets, and see if things get better or worse [`3:48`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=228).
- Lets you **objectively** decide which model to choose or which prompt works better [`3:48`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=228).

## Stress-testing and red-teaming

- Add more niche test scenarios as the product matures [`4:04`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=244).
- Goal: check the model correctly handles **unexpected, inappropriate, or risky inputs** [`4:04`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=244).

## Regression testing

- Goal: make sure fixing one thing doesn't break something else [`4:04`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=244).
- LLMs can be surprisingly **brittle**: small prompt tweaks can have unexpected side effects, so after any change verify that responses stay the same for other scenarios [`4:21`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=261).
- Technique: replay production data (e.g., from the past week) and compare what would have changed under a different prompt [`4:21`](https://www.youtube.com/watch?v=RIGU1hy3UR8&t=261).

---

Previous: [Automated evaluations](05-automated-evaluations.md) · Next: [Examples from Asana, Webflow, GitLab](07-examples-asana-webflow-gitlab.md)
