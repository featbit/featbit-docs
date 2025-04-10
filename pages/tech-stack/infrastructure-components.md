# Infrastructure Components

FeatBit [Application Services](application-services.md) relies on three critical infrastructure components: **Database**, **Message Queue**, and **Caching**.

## Database

The main database, used to store all feature flags, segments, end-users, etc. It corresponds to the **DbProvider**
environment variable **for API, ELS, and DAS**.

Available options include:

- **Primary Database**: `MongoDB` or `Postgres` for storing feature flags, segments, end-users data, etc.
- **Analytics Database**: Standalone and Standard version will use the primary database, while Professional version
  leverages `ClickHouse` for high-performance analytics on large datasets

## Message Queue

The message queue system ensures reliable communication between FeatBit services and enables real-time updates to SDKs.
It corresponds to the **MqProvider** environment variable **for API and ELS**.

There are two types of messages across the system:

- Real-time Messages: Feature flag and segment changes that require immediate delivery
- Job Messages: Background tasks processed sequentially based on timestamp

Available options include:

- **Postgres**: Uses `LISTEN/NOTIFY` for real-time messages and batch polling with timestamp ordering for job
  processing
- **Redis**: Uses `PUB/SUB` for real-time messages and list operations (`RPUSH/LPOP`) for job processing
- **Kafka**: Uses topics and partitions for both real-time messages and job processing

## Caching

The caching layer is used to boost the performance of the ELS. It corresponds to the **CacheProvider** environment
variable **for API and ELS**.

Available options include:

- **Redis**: ELS reads data from Redis and API ensures data in Redis is up to date.
- **None**: ELS reads data directly from the database.

## How to Choose

When selecting infrastructure providers, consider:

- **Existing Infrastructure**: Leverage your organization's existing technology investments
- **Operational Familiarity**: Choose technologies your team is comfortable maintaining
- **Performance Expectations**: High traffic loads benefit from Kafka messaging and ClickHouse analytics
