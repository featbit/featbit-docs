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
