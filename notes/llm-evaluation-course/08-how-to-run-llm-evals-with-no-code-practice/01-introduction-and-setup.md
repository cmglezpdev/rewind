# Introduction and setup

## What the video will do

- Practical, no-code walkthrough of LLM evaluations, in three parts: generate synthetic data, run evaluations with deterministic methods, and create a custom LLM-as-a-judge. [`0:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=2)
- Prerequisites:
  - An Evidently Cloud account (free to sign up). [`0:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=2)
  - Optionally an OpenAI API key — required only for synthetic data generation and LLM-as-a-judge; evaluations that don't need it still work without one. [`0:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=21)

## About Evidently AI

- Evidently AI builds AI observability tools: evaluate, test, and monitor AI systems, covering both traditional ML models and LLM-based systems. [`0:21`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=21)
- Open-source roots: the Evidently Python library has over 25 million downloads. [`0:38`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=38)
- Evidently Cloud is a platform built on top of the library, for AI quality workflows from pre-production experiments to production monitoring; developers use the Python API while non-technical users work through the UI. [`1:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=62)

## Project setup steps

1. Sign up for Evidently Cloud. [`1:02`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=62)
2. Create a project with a name and description (empty at first). [`1:30`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=90)
3. If you plan to use LLM-as-a-judge, store your OpenAI API key under "Secrets". [`1:42`](https://www.youtube.com/watch?v=gKp9K7Etv4A&t=102)
