---
title: User Segments
---

## Overview

This topic explains how to build and manage user segments. User segments let you target groups of users individually or by attribute.

## Understanding user segments 

User segments are lists of users that you can use to manage flag targeting behavior in bulk. Segments are useful for keeping groups of users, like `beta-users` or `enterprise-customers`, up to date. They allow you to more quickly turn features on or off for certain groups with confidence.

There are some differences between flag and segment targeting that you should be aware of:

* Segments are environment-specific. They do not populate in environments other than the one you created them in.
* Segment targeting cannot reference another user segment.

## Using the Segments list 

You can view segments on the **Segments** list. From the list, you can filter segments by name.

![](../../feature-flags/assets/users-and-user-segments/user-segments/001.webp)

## Creating user segments 

To create a new segment:

1. Navigate to the **Segments** list.
2.  Click **New segment**. The "New segment" panel appears.

![](../../feature-flags/assets/users-and-user-segments/user-segments/002.webp)
3. Give your segment a human-readable **Name**.
4. (Optional) Add a **Description**.
![](../../feature-flags/assets/users-and-user-segments/user-segments/003.webp)
5. Click **Create segment**. The segment's **Targeting** tab appears.

## Customizing user segments 

You can customize a segment to apply to different users or attributes, or exclude users and attributes, in the segment's **Targeting** tab. Segment targeting rules function the same way as flag targeting rules. To learn more, read [Targeting users](../targeting-users-with-flags/targeting-rules.md).

To customize a segment:

1. Navigate to the **Targeting** tab of the user segment you wish to modify.
2. Individually target users with the **Including users** or **Excluding users** options.
![](../../feature-flags/assets/users-and-user-segments/user-segments/004.png)
3.  Click  **+ Add rule** button on the right side of **Rules** to create a custom rule for this segment. The custom rule menu appears:
![](../../feature-flags/assets/users-and-user-segments/user-segments/005.png)
4. Specify an **attribute**, an **operator**, and **values** for the rule.
5. If you want to add more criteria, click the **plus button** at the bottom of the rule criteria.
![](../../feature-flags/assets/users-and-user-segments/user-segments/006.png)
6. Click **Save**.

> Understanding segment rule logic
>
> When you specify rules for a segment, FeatBit parses them in order of appearance from top to bottom. You can change how segment targeting applies based on the order of the rules you create.
>
> If user matched one of the rules, user is treated as a **Included users**

## Archive segments 

To archive a segment:
1. Find the segment you want to archive on the **Segments** list and click the three dots button.

![](../../feature-flags/assets/users-and-user-segments/user-segments/007.png)

2. Click on the **Archive** action button.
3. Click on the **Archive** button in the archive segment dialog.
If a feature flag is referencing the segment, you should first remove it from feature flag.

![](../../feature-flags/assets/users-and-user-segments/user-segments/008.png)

## Restore segments

You can restore an archived segment:
1. In the segment list page, click on the **Show archived** button
2. Find the segment you want to archive and click the three dots button
3. Click on the **Restore** action button.
![](../../feature-flags/assets/users-and-user-segments/user-segments/009.png)
4. Click on the **Restore** button in the restore segment dialog.

## Delete segments

You can delete an archived segment:
1. In the segment list page, click on the **Show archived** button.
2. Find the segment you want to archive and click the three dots button.
3. Click on the **Remove** action button.
![](../../feature-flags/assets/users-and-user-segments/user-segments/009.png)
4. Click on the **Remove** button in the remove segment dialog.