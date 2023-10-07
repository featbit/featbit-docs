# Client-side SDKs for Web APP

## Prerequisites

We assume that you've already completed the last three tutorials in "Get Started":

* You have successfully created two feature flags, `game runner` and `difficulty mode` in the tutorial [Create 2 flags for the demo](../2.-create-two-feature-flags.md).
* You have basic experience with how to [interact with the "`Dino Game` " demo](../3.-try-interacting-with-the-demo.md).

## Guide

In this tutorial, you will learn how to

* [Install javascript (typescript supported) client SDK in your Web APP project](client-side-sdks-for-web-app.md#install-client-sdk)
* [Initialize SDK & Identify a user with customized properties](client-side-sdks-for-web-app.md#initialize-sdk-and-identify-a-user)
* [Implement a feature flag to deliver, control the feature](client-side-sdks-for-web-app.md#implement-a-flag-to-control-the-feature)
* [Real-time update of feature flag](client-side-sdks-for-web-app.md#real-time-update-of-feature-flag)
* [To find out when the client is ready](client-side-sdks-for-web-app.md#to-find-out-when-the-client-is-ready)
* [Code Source & SDK's tutorial](client-side-sdks-for-web-app.md#code-source-and-sdks-tutorial)

## Install client SDK

Whatever the framework you use, we provide two methods to install SDK.

npm

```
npm install featbit-js-client-sdk
```

yarn

```
yarn add featbit-js-client-sdk
```

## Initialize SDK & Identify a user

#### To import the SDK

```javascript
// Using ES2015 imports
import fbClient from 'featbit-js-client-sdk';

// Using TypeScript imports
import fbClient from 'featbit-js-client-sdk';

// Using react imports
import fbClient from 'featbit-js-client-sdk';
```

If using typescipt and seeing the following error:

```
Cannot find module 'featbit-js-client-sdk/esm'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
```

just add this in your tsconfig.json file

```
  "compilerOptions": {
    "moduleResolution": "node"
  },
```

#### Initializing the SDK

You need to call `.init()` function of SDK to initialize. You should also pass the configuration parameters to the `.init()` function.

```javascript
const option = {
    secret: 'your env secret',
    api: 'api/ws url to FeatBit service',
    user: {
      name: 'the user's user name',
      keyId: 'the user's unique identifier',
      customizedProperties: [{
       "name": "the name of the property",
       "value": "the value of the property"
     }]
    }
};

fbClient.init(option);
```

*   **secret**: the environment secret. **mandatory**. This identifies the connection between your application and FeatBit. You can find the environment secret by hovering your mouse on the environment name (check the image below).&#x20;

    <figure><img src="../../.gitbook/assets/image (232).png" alt=""><figcaption></figcaption></figure>
*   **api**: api/ws url to FeatBit service. **mandatory**. The default URL in docker-compose is http://localhost:5100.

    <figure><img src="../../.gitbook/assets/image (292).png" alt=""><figcaption></figcaption></figure>
* **user**: the user connected to your APP, can be ignored if **anonymous** equals to true.
  * **userName**: the user name. **mandatory**
  * **id**: the unique identifier. **mandatory**
  * **customizedProperties**: any customized properties you want to send to the back end. It is extremely powerful when you define targeting rules or segments. **not mandatory**

**You can checkout demo's code source to get practice.**

{% tabs %}
{% tab title="React" %}
[React demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-react)

<figure><img src="../../.gitbook/assets/image (76).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="VUE" %}
[ VUE demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-vue).\


<figure><img src="../../.gitbook/assets/image (90).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Angular" %}
We need a contributor who can contribute a sample with Angular and the documentation for quick start.&#x20;
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you can't get user information during the initialization of SDK, you can use fbClient.identify() function to register user. More information can be found in [GitHub SDK Readme](https://github.com/featbit/featbit-js-client-sdk).&#x20;
{% endhint %}

## Implement a flag to control the feature

Use `.variation()` method to get the return value of a feature flag for a specified user (or anonymous user).

```javascript
var flagValue = fbClient.variation("YOUR_FEATURE_KEY", defaultValue);
if(flagValue === 'true'){
    runFeature();
}
```

*   The first parameter of variation is the key of the feature flag.

    <figure><img src="../../.gitbook/assets/image (283).png" alt=""><figcaption></figcaption></figure>
* `defaultValue` will be used when program met issues like failed connect to the internet. This value should have the same type as defined on the remote.
* The return value of `.variation()` is computed on backend service.&#x20;

**You can checkout demo's code source to get practice.**

{% tabs %}
{% tab title="React" %}
[React demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-react). In the demo, we wrapped `fbClient.variation` in a proxy function (a Syntactic sugar) that developers can use in a friendly way.\


<figure><img src="../../.gitbook/assets/image (220).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="VUE" %}
[VUE demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-vue). In the demo, we wrapped `ffcClient.variation` in a proxy function (a Syntactic sugar) that developers can use in a friendly way.\


<figure><img src="../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Angular" %}
We need a contributor who can contribute a sample with Angular and the documentation for quick start.&#x20;
{% endtab %}
{% endtabs %}

## Real-time update of feature flag

`.variation()` method returns a result when you call it. If you want to watch feature flags update in real time, you can use `.on()` method.  This method is called immediately after you update a feature flag in the portal.

```javascript
fbClient.on('ready', (data) => {
  // data has the following structure [ {id: 'featureFlagKey', variation: variationValue} ]
  // variationValue has the type as defined on remote
  var flagValue = fbClient.variation("YOUR_FEATURE_KEY", defaultValue);
});
```

**You can checkout demo's code source to get practice.**

{% tabs %}
{% tab title="React" %}
[React demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-react)

<figure><img src="../../.gitbook/assets/image (164).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="VUE" %}
[VUE demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-vue).

<figure><img src="../../.gitbook/assets/image (107).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Angular" %}
We need a contributor who can contribute a sample with Angular and the documentation for quick start.&#x20;
{% endtab %}
{% endtabs %}

## To find out when the client is ready

To find out when the client is ready, you can use one of two mechanisms: events or promises.

The client object can emit JavaScript events. It emits a ready event when it receives initial flag values from feature-flags.co. You can listen for this event to determine when the client is ready to evaluate flags.

```javascript
fbClient.on('ready', (data) => {
  // data has the following structure [ {id: 'featureFlagKey', variation: variationValue} ]
  // variationValue has the type as defined on remote
  var flagValue = fbClient.variation("YOUR_FEATURE_KEY", defaultValue);
});
```

Or, you can use a promise instead of an event. The SDK has a method that return a promise for initialization: waitUntilReady(). The behavior of waitUntilReady() is equivalent to the ready event. The promise resolves when the client receives its initial flag data. As with all promises, you can either use .then() to provide a callback, or use await if you are writing asynchronous code.

```javascript
fbClient.waitUntilReady().then((data) => {
  // data has the following structure [ {id: 'featureFlagKey', variation: variationValue } ]
  // variationValue has the type as defined on remote
  // initialization succeeded, flag values are now available
});
// or, with await:
const featureFlags = await fbClient.waitUntilReady();
// initialization succeeded, flag values are now available
```

{% tabs %}
{% tab title="React" %}
[React demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-react)

<figure><img src="../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="VUE" %}
[VUE demo sample code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-vue).

<figure><img src="../../.gitbook/assets/image (216).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Angular" %}
We need a contributor who can contribute a sample with Angular and the documentation for quick start.&#x20;
{% endtab %}
{% endtabs %}

## Code Source & SDK's tutorial

The interactive demo DinoGame has been written in different Frameworks. React, VUE and Angular. Every step taught in this tutorial can be found in these code source:

* [React DinoGame code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-react)
* [VUE DinoGame code source](https://github.com/featbit/featbit-samples/tree/main/samples/dino-game/interactive-demo-vue)
* Angular DinoGame code source (We need your contribution)

Javascript SDK is also open sourced, you can check the code source and ReadMe to discover more about the SDK, for example: developer mode, bootstrap, The complete list of the available parameters in option. [Click here to link to the GitHub page of SDK](https://github.com/featbit/featbit-js-client-sdk).





