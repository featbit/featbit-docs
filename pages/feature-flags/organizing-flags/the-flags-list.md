# The flags list

## Overview

This topic explains how to use the feature flags list, which shows your feature flags and gives you options to create, modify, and manage them.

## Viewing feature flags

All of your feature flags **within an environment** appear on the flags list. Creating a new flag adds it to the list, and archiving a flag removes it from the list. You can use the search bar to find a flag by name, key, tag, or status.

By default, the most recently updated flags appear first, and archived flags **will not** be shown in the list. To view the archived flag list, you need to check the 'Archived' checkbox.

Here is an image of the feature flags list:&#x20;

<figure><img src="../../.gitbook/assets/flag-list.png" alt=""><figcaption><p>The feature flags list</p></figcaption></figure>

## Creating feature flags

To create a feature flag:

1. Navigate to the flag list.
2. Click **Add** button. The "New feature flag" dialog appears.
3. Enter a unique, human-readable Name.
4. Click **Save** button.

<figure><img src="../../.gitbook/assets/create-flag.png" alt=""><figcaption><p>The "New feature flag" dialog</p></figcaption></figure>

{% hint style="info" %}
_**NOTE:**_ A suggested key auto-populates when you enter the name, you'll use this key to reference the flag in your code. After you save the flag key, you **cannot modify** it. You can change a flag's name, however, whenever you want.
{% endhint %}

You just created a feature flag. It appears in the list.

## Copying feature flags

To copy flags from one environment to another environment:

1. Navigate to the flag list.
2. Choose the flags you wish to copy.
3.  Hover on the overflow menu button and choose **Copy to environment**.

    <figure><img src="../../.gitbook/assets/select-flags-and-choose-copy-menu.png" alt=""><figcaption><p>The flags list, with the "Copy to environment" button called out.</p></figcaption></figure>
4.  Check the selected flags again and choose the targeting environment which flags will be copied to.

    <figure><img src="../../.gitbook/assets/copy-flags.png" alt=""><figcaption><p>"Bulk copy" dialog</p></figcaption></figure>
5. Click **Ok** button.

{% hint style="warning" %}
**Note:  **_**The Targeting user and rules will not be copied.**_ Because one of your rules may references a segment that does not exist in the target environment and the targeting user also may not exist in the target environment.
{% endhint %}
