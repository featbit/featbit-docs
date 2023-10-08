# Go SDK

## Guide

* I[nstall Go SDK in your project](go-sdk.md#install-go-sdk)
* [Create a FeatBit client instance](go-sdk.md#create-a-featbit-client-instance)
* [Initialize a FeatBit enduser](go-sdk.md#initialize-a-featbit-enduser)
* [Implement a flag to control the feature](go-sdk.md#implement-a-flag-to-control-the-feature)

## Install Go SDK

```go
go get github.com/featbit/featbit-go-sdk

```

## Create a FeatBit client Instance

After you install and import the SDK, create a single, shared instance of the FeatBit client

```go
client, err := featbit.NewFBClient(envSecret, streamingUrl, eventUrl)
if err != nil {
    // error handle
}
```

**envSecret**: the environment secret. **mandatory**. This identifies the connection between your application and FeatBit. You can find the environment secret by hovering your mouse on the environment name (check the image below).

<figure><img src="../../../.gitbook/assets/envsecret.png" alt=""><figcaption></figcaption></figure>

**streamingURL**: **mandatory,** URL of your feature management platform to synchronize feature flags, user segments, etc.

**eventURL**: **mandatory,** URL of your feature management platform to send analytics events

The default URL in docker-compose is (ws|http)://localhost:5100.

<figure><img src="../../../.gitbook/assets/remote-url.png" alt=""><figcaption></figcaption></figure>

## Initialize a FeatBit enduser

```go
user, err := NewUserBuilder("key").UserName("name").Custom("property", "value").Build()
if err != nil {
    // error handle
}
```

**FBUser**: the user connected to your APP

* **userName**: the user name. **mandatory**
* **key**: the unique identifier. **mandatory**
* **custom**: any customized properties you want to send to the back end. It is extremely powerful when you define targeting rules or segments. **not mandatory**

## Implement a flag to control the feature

<pre class="language-go"><code class="lang-go">// be sure that SDK is initialized
// this is not required
if(client.isInitialized()){
    // Flag value
    // returns a string variation
    if res, _, err := client.BoolVariation("runner-game", user, false); res {
        if err != nil {
            // error handle
        }
        fmt.Printf("Dino Game is released to %s \n", userKey)
    }
    else{
        fmt.Printf("Dino Game is not released to %s \n", userKey)
    }
}
<strong>
</strong></code></pre>

<figure><img src="../../../.gitbook/assets/demo-run-result.png" alt=""><figcaption></figcaption></figure>

## Code Source & SDK's tutorial

The interactive demo DinoGame has been written in different Frameworks. Every step taught in this tutorial can be found in [here](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/demo-golang)

Go SDK is also open sourced, you can check the code source and ReadMe to discover more about the SDK, for example: developer mode, bootstrap, The complete list of the available parameters in option. [Click here to link to the GitHub page of SDK](https://github.com/featbit/featbit-go-sdk)[.](https://github.com/featbit/featbit-go-sdk)
