# Python SDK

## Guide

* [Install Python SDK in your project](python-sdk.md#install-python-sdk)
* [Create a FeatBit client instance](python-sdk.md#create-a-featbit-client-instance)
* [Create a FeatBit enduser](python-sdk.md#create-a-featbit-enduser)
* [Implement a flag to control the feature](python-sdk.md#implement-a-flag-to-control-the-feature)
* [Code Source & SDK's tutorial](python-sdk.md#code-source-and-sdks-tutorial)

## Install Python SDK

```
// install the latest version of python SDK
pip install fb-python-sdk
```

## Create a FeatBit client Instance

After you install and import the SDK, it's strongly recommended to create a single, shared instance of the FeatBit client

```python
from fbclient import get, set_config
from fbclient.config import Config

set_config(Config(env_secret, event_url, streaming_url))
fb_client = get()
```

`env_secret`: the environment secret. **mandatory**. This identifies the connection between your application and FeatBit. You can find the environment secret by hovering your mouse on the environment name (check the image below).

<figure><img src="../../../.gitbook/assets/envsecret.png" alt=""><figcaption></figcaption></figure>

**remote url**: `event_url` and `streaming url` to FeatBit service. **mandatory**. The default URL in docker-compose is http://localhost:5100.

<figure><img src="../../../.gitbook/assets/remote-url.png" alt=""><figcaption></figcaption></figure>

you can also create FeatBit client in using `FBClient:`&#x20;

<pre class="language-python"><code class="lang-python"><strong>from fbclient.client import FBClient
</strong>from fbclient.config import Config
<strong>
</strong><strong>config = Config(env_secret, event_url, streaming_url)
</strong>fb_client = FBClient(config)
</code></pre>

## Create a FeatBit enduser

<pre class="language-python"><code class="lang-python"><strong># end user
</strong><strong>user = {"key": "test-user-10", "name": "test-user-10"}
</strong></code></pre>

`enduser` is a dictionary of attributes that can affect flag evaluation, usually corresponding to a user of your application. This object contains built-in properties(`key`, `name`). The `key` and `name` are required. The `key` must uniquely identify each user; this could be a username or email address for authenticated users, or a ID for anonymous users. The `name` is used to search your user quickly. You may also define custom properties with arbitrary names and values. For instance, the custom key should be a string; the custom value should be a string or a number

## Implement a flag to control the feature

{% code lineNumbers="true" %}
```python
// Some code
variation = fb_client.variation("runner-game", user, False)
if variation:
    print(f"Dino Game not released to {user['name']}")
else:
    print(f"Dino Game not released to {user['name']}")
# be sure to send events
sleep(5)
fb_client.stop()
```
{% endcode %}

<figure><img src="../../../.gitbook/assets/result.png" alt=""><figcaption></figcaption></figure>

`variation` return the flag value of a feature flag for a given user. The result is the flag evaluation is converted to:

* string if the feature flag is a string type
* bool if the feature flag is a boolean type
* Python object(Dict, Tuple, List...etc) if the feature flag is a json type
* float/int if the feature flag is a numeric type

Note that feature flag key, user, default value are both **mandatory**.

## Code Source & SDK's tutorial

The interactive demo DinoGame has been written in different Frameworks. Every step taught in this tutorial can be found in these code source:

* [Python Demo](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/demo-python)

Python SDK is also open sourced, you can check the code source and ReadMe to discover more about the SDK, for example: developer mode, bootstrap, The complete list of the available parameters in option. [Click here to link to the GitHub page of SDK](https://github.com/featbit/featbit-python-sdk).
