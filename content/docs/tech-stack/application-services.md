---
title: Application Services
---

FeatBit consists of three core services that work together. Each service can be deployed independently, allowing teams
to adapt their deployment strategy based on organizational requirements, traffic volume, and infrastructure preferences.

## UI Service (UI)

A web interface built with React, shadcn/ui, and Tailwind CSS for managing feature flags, segments, experiments, and other
configurations through an intuitive dashboard.

Refer to the [UI README.md](https://github.com/featbit/featbit/tree/main/modules/front-end) for more details (how to
run, environment variables, etc.).

## API Service (API)

A .NET-based RESTful backend service that handles data management, authentication, webhooks, integrations, and provides
endpoints for the UI and external systems.

Refer to the [API README.md](https://github.com/featbit/featbit/tree/main/modules/back-end) for more details (health
check, environment variables, etc.).

## Evaluation Server Service (ELS)

A .NET-based high-performance evaluation engine that evaluates flag rules and distributes flag updates in real-time to
SDKs. Optimized for minimal latency and high throughput.

Refer to the [ELS README.md](https://github.com/featbit/featbit/tree/main/modules/evaluation-server) for more details
(health check, environment variables, etc.).
