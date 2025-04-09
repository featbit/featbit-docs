# Data Flows

When the system is running, data flows between different services. There are four main data flows:

### Data sync flow

After a websocket connection has been established between a client or server SDK and ELS, the SDK would then send a data
sync request attached with the timestamp of the latest changes to ELS, ELS will then check that timestamp and fetch
eligible feature flags and segments from Caching/Database component, after an eventual evaluation process (
only for client SDK), the result would be sent back to SDK. The response has one of the two types:

* **full**: the response contains all feature flags and segments
* **patch**: the response contains only the new feature flags and segments created or updated since the timestamp

![](../tech-stack/assets/data-sync-flow.svg)

### Feature flag / Segment changes flow

When a user changes a feature flag or a segment from the UI, in addition to store data in MongoDB, the API server also
pushes the changes to Kafka, ELS reads those changes, update Redis, evaluate feature flags related to the
changes and sends related feature flags or evaluation results to client/server side SDK through WebSocket connections.

![](../tech-stack/assets/architecture/003.png)

### End user data flow

End user data is stored in MongoDB and serves for feature flag and segment targeting.

When client SDK establishes a WebSocket connection or switches to another user (by calling the identify API), or
client/server SDK sends track message, ELS sends end user information to Kafka, then API server reads that
data and update/insert into MongoDB.

![](../tech-stack/assets/architecture/004.png)

### Insights data flow

Feature flag and metric track data is stored in ClickHouse and serves for A/B/n testing (experimentation) and reporting.

When client/server SDK sends feature flag and metric track messages to ELS, the latter forwards the track
messages to Kafka, Data analytics servers reads track messages from Kafka and stores them in ClickHouse.

![](../tech-stack/assets/architecture/005.png)

## **You are the only owner of all your data**

The overall architecture also ensures privacy aspects since all the data and communication stays within the system. It
will not send any data to any third party service.
