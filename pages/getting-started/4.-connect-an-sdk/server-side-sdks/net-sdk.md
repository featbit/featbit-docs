# .NET SDK

## Installation

The latest stable version is available on [NuGet](https://www.nuget.org/packages/FeatBit.ServerSdk/).

```sh
dotnet add package FeatBit.ServerSdk
```

Use the `--version` option to specify a [preview version](https://www.nuget.org/packages/FeatBit.ServerSdk/absoluteLatest) to install.

## Initialization

After you install the SDK, create **a single, shared instance** of `FbClient`. Specify your SDK key here to authorize your application to connect to a particular environment within FeatBit.

```csharp
// Creates a new client instance that connects to FeatBit with the default option.
// Applications should instantiate a single FbClient instance for the lifetime of the application.
var client = new FbClient("your-environment-sdk-secret");
if (client.Initialized)
{
    Console.WriteLine("FbClient successfully initialized!");
}
else
{
    Console.WriteLine("FbClient failed to initialize.");
}
```

{% hint style="danger" %}
FbClient should be a singleton.&#x20;

**Do not** instantiate a new client with every request. The client instance maintains internal state that allows FeatBit to serve feature flags without making any remote requests.&#x20;
{% endhint %}

You can find the SDK secret for this environment from FeatBit's portal :

<div align="center">

<figure><img src="../../../.gitbook/assets/copy-env-secret.png" alt=""><figcaption><p>Copy environment secret.</p></figcaption></figure>

</div>

## Evaluating flags

In this .NET SDK, there is a `Variation` method that returns a flag value, and a `VariationDetail` method that returns an object describing how the value was determined for each type.&#x20;

Variation calls take the feature flag key, a FbUser, and a default value. If any error makes it impossible to evaluate the flag (for instance, the feature flag key does not match any existing flag), default value is returned.

```csharp
var user = FbUser.Builder("featbit-bot").Build();
if (client.BoolVariation("game-runner", user, defaultValue: false))
{
    var difficultyMode = client.StringVariation("difficulty-mode", user, defaultValue: "normal");
    Console.WriteLine($"Dino Game is released to {user.Key} with {difficultyMode} mode");
}
else
{
    Console.WriteLine($"Dino Game not released to {user.Key}");
}
```

## Next Step

More documentation and examples of the .NET SDK is available at the [GitHub](https://github.com/featbit/dotnet-server-sdk).
