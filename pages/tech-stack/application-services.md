# Application Services

FeatBit's consists of four core services that work together, each service can be deployed independently, allowing teams
to adapt their deployment strategy based on organizational requirements, traffic volume, and infrastructure preferences.

## UI Service (UI)

An Angular-based web interface for managing feature flags, segments, experiments, and other configurations through an
intuitive dashboard.

## API Service (API)

RESTful backend service that handles data management, authentication, webhooks, integrations, and provides endpoints for
the UI and external systems.

## Evaluation Server Service (ELS)

High-performance evaluation engine that evaluates flag rules and distributes flag updates in real-time to SDKs. Optimized
for minimal latency and high throughput.

## Data Analytics Service (DAS)

Near real-time analytics engine that processes event data, calculates experiment results, and generates insights for
feature flag usage metrics (for example: feature flag reporting).