# Deployment Options

You have three deployment options for FeatBit:

Both of them are **scalable and fast**, and **have identical features**.

It better if you've already read the [Infrastructures](../tech-stack/infrastructures.md) of FeatBit.

#### FeatBit Standalone

The simplest deployment option, where Postgres is all you need to run FeatBit.

- DbProvider: Postgres
- MqProvider: Postgres
- CacheProvider: None

Dependencies: Postgres. There is no cache layer for Evaluation Server Service, so ELS will directly read data from
Postgres.

#### FeatBit Standard

Compared to the standalone version, the standard version is more scalable and fast. It is ideal for small to medium
teams.

- DbProvider: MongoDB or Postgres
- MqProvider: Redis
- CacheProvider: Redis

Dependencies: Postgres/MongoDb as the database tool, Redis is used the cache layer for ELS so the ELS can read data from
Redis instead of database. Redis is also used as the message queue

#### FeatBit Professional

In professional version, we use Kafka and ClickHouse to make the data processing more scalable and fast.

For API and ELS:

- DbProvider: MongoDB or Postgres
- MqProvider: Kafka
- CacheProvider: Redis

For DAS:

DbProvider: ClickHouse

Dependencies: Postgres/MongoDb as the database tool, Redis as the cache layer for ELS, Kafka as the messaging tool and
ClickHouse as the data analytics tool.