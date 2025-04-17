# Application Services

FeatBit consists of four core services that work together, each service can be deployed independently, allowing teams
to adapt their deployment strategy based on organizational requirements, traffic volume, and infrastructure preferences.

## UI Service (UI)

An Angular-based web interface for managing feature flags, segments, experiments, and other configurations through an
intuitive dashboard.

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

## Data Analytics Service (DAS)

A Python-based near real-time analytics engine written in Python that processes event data, calculates experiment
results, and generates insights for feature flag usage metrics (for example: feature flag reporting).

Refer to the [DAS README.md](https://github.com/featbit/featbit/tree/main/modules/data-analytics) for more details (how
to run, environment variables, etc.).