# Targeted Progressive Delivery

> **Targeted Progressive Delivery**
>
> They give teams the confidence to move fast without breaking things. FeatBit allows for precise user targeting and feature flag rules that open the door to all kinds of targeted rollouts: ring deployments, percentage deployments, canary launches, and so on. These targeted, incremental release strategies, or release progressions, involve far less risk than big-bang waterfall releases. Employ Targeted Progressive Delivery techniques to code faster, reduce risk, and continuously improve the customer experience.

## Prerequisites

We assume that you've already completed the last three tutorials in "Get Started":

* You have successfully created two feature flags, `game runner` and `difficulty mode` in the tutorial [Create 2 flags for the demo](../2.-create-two-feature-flags.md).
* You have basic experience with how to [interact with the "`Dino Game` " demo](../3.-try-interacting-with-the-demo.md).
* You know how to [connect an SDK](../4.-connect-an-sdk/) to your program or the "Dino Game" demo:
  * Download a demo code sample
  * Initialize SDK
  * Identify a user with customized properties.
  * Implement a feature flag to deliver, and control the feature

## Progressively release game

After testing in production our "Dino Game", you still worry about if the game can run correctly. To avoid the incident for all users, you progressively release your feature. By default, you planned to release the feature at a pace of&#x20;

1. 5% at the beginning
2. 20% if there were no bugs for the previous the first 5% of users
3. 50% if there were no obvious bugs for the previous 20% of users&#x20;
4. 100% if no obvious bug for the previous 50% of users &#x20;

To achieve this, you just need to modify default rule to serve "rollout percentage", then assign for example 10 percent to `true`, and 90 percent to `false`.

<figure><img src="../../.gitbook/assets/无标题2.png" alt=""><figcaption></figcaption></figure>

This means 10% of users will receive return variation `true`, and the DinoGame will release to those users who got a true variation.

<figure><img src="../../.gitbook/assets/image (55).png" alt=""><figcaption><p>Demo code in VUE</p></figcaption></figure>

Whenever you met a worse feedback (bugs) during the release process, you can rollback your feature release immediately by reallocating the rollout percentage.&#x20;

{% hint style="info" %}
The rollout percentage algorithm is a normal random distribution algorithm and is computed based on end user id.\
![](<../../.gitbook/assets/image (87).png>)
{% endhint %}

## Progressively release to an organization

Sometimes, you just want to progressively release to particular organization instead of all users. You can create a rule in “Rules” section to achive that.

### Create a user property for rules

First, you need to create rule property in Portal. Go to "End users" page, click on the button "Properties".

<figure><img src="../../.gitbook/assets/image (95).png" alt=""><figcaption></figcaption></figure>

Add a new property name "orgId", and click "Save" to create it.&#x20;

<figure><img src="../../.gitbook/assets/image (58).png" alt=""><figcaption></figcaption></figure>

You can add predefined values for the property you created.

<figure><img src="../../.gitbook/assets/image (138).png" alt=""><figcaption></figcaption></figure>

### Pass the property and values to system (for developers only)

Be sure that the property "orgId" and the value have been passed to FeatBit system when initializing SDK. Be sure that the key you set in preset values (image above) is as same as what you passed in the code of SDK initiliazing.

<figure><img src="../../.gitbook/assets/image (59).png" alt=""><figcaption></figcaption></figure>

The FeatBit system will compare the property and its value you passed through SDK to the property and the values you configured in the Portal.

### Progressively release to Company AA

Go back to "game runner" feature flag's "Targeting" page. Create a rule with the property "orgId" you just created. You need to：

1. Add a new rule with a name (ex. Progressively release to company AA).&#x20;
2. Add a condition, if user's "orgId" is in the list, this user has 10% opportunity to receive a `true` variation.

<figure><img src="../../.gitbook/assets/image (257).png" alt=""><figcaption></figcaption></figure>

With the rule we set above, the DinoGame will release to 10% of users in Company AA. Whenever you met a worse feedback (bugs) during the release process, you can rollback your feature release immediately by reallocating the rollout percentage.&#x20;
