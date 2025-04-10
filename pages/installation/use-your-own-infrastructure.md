# Use your own infrastructure

If you want to run FeatBit with your own infrastructure, this is totally possible and easy to do. This document will illustrate how to do it with docker compose, it can also be easily converted to Kubernetes.

## Set Environment Variables

To use your own infrastructure, you need to modify some environment variables for each service. You can find the environment variables for each service in the following links:

- [UI Environment Variables](https://github.com/featbit/featbit/tree/main/modules/front-end#install-with-docker)
- [API Server Environment Variables](https://github.com/featbit/featbit/tree/main/modules/back-end#environment-variables)
- [Evaluation Server Environment Variables](https://github.com/featbit/featbit/tree/main/modules/evaluation-server#environment-variables)
- [Data Analytics Server Environment Variables](https://github.com/featbit/featbit/tree/main/modules/data-analytics#environment-variables)

## Data Seeding

### MongoDB

Check the [MongoDB seed script](https://github.com/featbit/featbit/blob/main/infra/mongodb/docker-entrypoint-initdb.d/init.js) to seed your MongoDB database. This script assumes the database name is "featbit" (you can change it) which should be the same as `MongoDb__Database` environment variable.

### Postgres

Check the [Postgres initialization scripts](https://github.com/featbit/featbit/tree/main/infra/postgresql/docker-entrypoint-initdb.d) for the database schema and seed data.

### Kafka

You need to create the following topics in your kafka:

* featbit-feature-flag-change
* featbit-segment-change
* featbit-insights
* featbit-endusers

## FAQ

* [How to solve the docker container port conflict problem?](faq.md#how-to-solve-docker-container-port-conflict-problem)
* [How to make FeatBit portal accessible publically?](faq.md#how-to-make-featbit-portal-accessible-publicly)
