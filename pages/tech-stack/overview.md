## Overview

FeatBit is a **scalable**, **fast** and **lightweight** Feature Management platform designed to be easy of use across
both small and large businesses.

FeatBit consists of 4 application services with 3 infrastructure components.

### System Architecture

FeatBit consists of four services:

- **UI Service (UI)**: An Angular-based web interface for managing feature flags, segments, experiments, and other
  configurations through an intuitive dashboard.
- **API Service (API)**: RESTful backend service that handles data management, authentication, webhooks, integrations,
  and
  provides endpoints for the UI and external systems.
- **Evaluation Server Service (ELS)**: High-performance evaluation engine that evaluate flag rules and distributes flag
  updates in realtime to SDKs. Optimized for minimal latency and high throughput.
- **Data Analytics Service (DAS)**: Near real-time analytics engine that processes event data, calculates experiment
  results, and generates insights for feature flag usage metrics.




