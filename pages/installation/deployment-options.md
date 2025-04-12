# Deployment Options

FeatBit offers multiple deployment options to suit your infrastructure requirements and team size. Each option
provides the same core feature flag functionality while differing in performance and infrastructure dependencies.

Before selecting a deployment option, we recommend reviewing
the [Infrastructure Components](../tech-stack/infrastructure-components.md) to understand what each component does.

## Comparison Overview

| Capability    | Standalone | Standard         | Professional                  |
|---------------|------------|------------------|-------------------------------|
| Database      | Postgres   | Postgres/MongoDB | Postgres/MongoDB + ClickHouse |
| Message Queue | Postgres   | Redis            | Kafka                         |
| Caching       | None       | Redis            | Redis                         |

## FeatBit Standalone

The simplest deployment option with minimal infrastructure requirements using Postgres for all core functions.
Suitable for small to medium teams and applications with moderate traffic.

- **Database (DbProvider)**: Postgres
- **Message Queue (MqProvider)**: Postgres
- **Caching (CacheProvider)**: None

## FeatBit Standard

A balanced deployment option that offers improved scalability and performance by using Redis for caching and messaging.
It is suitable for small to large teams and applications, supporting high-volume feature flag requests and moderate data
analysis traffic.

- **Database (DbProvider)**: Postgres or MongoDB
- **Message Queue (MqProvider)**: Redis
- **Caching (CacheProvider)**: Redis

## FeatBit Professional

A complex deployment with advanced analytics capabilities for large datasets and high-volume environments. Suitable for
large teams, high traffic applications, and organizations requiring robust data analytics.

For API service (API) and Evaluation Server Service (ELS):

- **Database (DbProvider)**: Postgres or MongoDB
- **Message Queue (MqProvider)**: Kafka
- **Caching (CacheProvider)**: Redis

For Data Analytics Service (DAS):

- **Analytics Database(DbProvider)**: ClickHouse