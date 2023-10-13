# DataDog (Preview)

We planned to add DataDog integration in FeatBit, it will mainly includes following ways to integration with DataDog:

1. [DataDog's RUM (Real User Monitoring) feature flags system](https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=browser#analyze-your-feature-flag-performance-in-rum) to send feature flag evaluation data from the FeatBit [JavaScript SDK](https://github.com/featbit/featbit-js-client-sdk) to DataDog as event properties
2. [DataDog's events](https://docs.datadoghq.com/api/?lang=bash#events) to receive any activity from FeatBit such as Feature Flags and segment updates.
3. Toggle a flag's targeting on or off if a performance metric drops below a certain threshold using FeatBit's flag trigger or REST APIs.
4. Send feature flag usage events and custom events to DataDog Metrics and Traces.

## Using the Datadog RUM integration

The Datadog RUM integration allows you to send feature flag evaluation data from the FeatBit [JavaScript SDK](

## DataDog Metrics and Traces

Datadog provides various tools and features for monitoring the performance and behavior of applications and systems. In Datadog, metrics and traces serve different purposes and are used for distinct types of monitoring and analysis.

**Metrics** in Datadog are used for high-level, real-time monitoring of performance data like request rates, error rates, and resource utilization.

**Traces**, particularly in Datadog's APM, are for detailed tracking of request flow through your application, helping with debugging and optimization.

By exporting FeatBit's Feature Flag Insights events to DataDog, you can choose Metrics for an overview of flag usage (counts, high-level impact) and Traces for in-depth insights into how flags affect individual requests. Using both metrics and traces can provide a comprehensive view of feature flag behavior and application performance.

This feature is currently under development and will be available in the near future.