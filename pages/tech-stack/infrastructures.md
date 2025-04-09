# Infrastructures

## Database

The main database, used to store all feature flags, segments, end users, etc.

The database provider can be either MongoDB or Postgres, for Data Analytics Service (DAS) it can also be ClickHouse.

In Standalone and Standard version, the DAS will use the same database as the API and ELS, which is
MongoDB or Postgres, to store the insights data. In Professional version, the DAS will use ClickHouse
to store the insights data.

## Message Queue

There are two types of messages across the whole system: real-time messages and job messages. Real-time messages should
be delivered as quickly as possible, while job messages can be processed in sequence, order by the timestamp.

In FeatBit, the real-time messages include feature flag changed and segment changed message, which are used to notify
the SDKs that data have been updated.

The message queue provider has three options available

1. Postgres. For real-time messages, we use Postgres LISTEN/NOTIFY, for job messages we poll messages in batch, order by
   the timestamp and handle them one by one.
2. Redis. For real-time messages, we use Redis PUB/SUB, for job messages we use Redis List's RPUSH/LPOP.
3. Kafka. We use Kafka's topic and partition system to handle all messages.

## Caching

The cache provider is used to boost the performance of the ELS. Can be set to `Redis` or `None`.

If set to `Redis`, the ELS will read data from Redis and the API will make sure the data in Redis is up to date.
If set to `None`, API will do nothing and the ELS will read data from the database directly.

# Infrastructures

FeatBit application services relies on three critical infrastructure components: database, message queue, and caching,

## Database

The main database, used to store all feature flags, segments, end-users, etc. Corresponding to the `DbProvider`
environment variable for API, ELS, and DAS.

### Available Options

| Version               | Primary Database          | Analytics Database                                   |
|-----------------------|---------------------------|------------------------------------------------------|
| Standalone & Standard | `MongoDB` or `PostgreSQL` | Same as primary                                      |
| Professional          | `MongoDB` or `PostgreSQL` | ClickHouse for better performance on large datasets. |

## Message Queue

The message queue system ensures reliable communication between FeatBit services and enables real-time updates to SDKs.
Corresponding to the `MqProvider` environment variable for API and ELS.

### Message Types

- **Real-time Messages**: Feature flag and segment changes that require immediate delivery
- **Job Messages**: Background tasks processed sequentially based on timestamp

### Available Options

| Provider     | Real-time Mechanism   | Job Processing                        |
|--------------|-----------------------|---------------------------------------|
| `PostgreSQL` | LISTEN/NOTIFY         | Batch polling with timestamp ordering |
| `Redis`      | PUB/SUB               | List operations (RPUSH/LPOP)          |
| `Kafka`      | Topics and partitions | Topics and partitions                 |

## Caching

The caching layer is used to boost the performance of the ELS. Corresponding to the `CacheProvider` environment variable
for API and ELS.

### Available Options

| Provider | Description                                                                |
|----------|----------------------------------------------------------------------------|
| `Redis`  | ELS reads data from Redis and the API ensures data in Redis is up to date. |
| `None`   | ELS reads data directly from the database.                                 |

## Selection Considerations

When selecting infrastructure providers, consider:

- **Existing Infrastructure**: Leverage your organization's existing technology investments
- **Operational Familiarity**: Choose technologies your team is comfortable maintaining
- **Performance Expectations**: High traffic loads benefit from Kafka messaging and ClickHouse analytics
