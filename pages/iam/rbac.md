# Permision Access Control (RBAC)

## Organization Level Access Control

Once you install the FeatBit in your infrastructure, you actually are the owner of a workspace. Each workspace could have multiple organizations. Each organization could have multiple projects. Each project can have multiple environments.

For the access control, we start at the organization level. You can control who can access the organization, projects under the organization, and environments under each project, and also the feature flags under each environment.

![](../iam/assets/rbac/access_org.png)

## Prerequisites

Before you start to manage access control, you should:
- Have teams and members created in your organization. You can refer to [User and Team Management](./teams) to add members and teams.
- Have groups (member collections) created in your organization. You can refer to [Group Management](./groups) to add groups.

## Project Access Control

After you switch to the organization you want to manage, you will see all projects under this organization as shown below:

![](../iam/assets/rbac/org_project_list.png)

In the next sub-sections, we will show you how to manage access control for projects under this organization.

### Enable User Access to Specific Projects

1. Go to the `Policies` page under `IAM` menu.
2. Click on `Add` button, input the policy name and description, then click `Save`.
3. In the policy detail page, click on `(+)` icon to add a new permission
    - Choose `Project` as the control-level (resource type).
    - Select the project you want to allow access to in resource selector.
    - In allow or deny selector, choose `Allow`.
    - In action selector, choose `CanAccessProject`.

![](../iam/assets/rbac/enable-project-access-policy.png)

4. Click **Save** to save the permission.
5. Go to `Team` or `Groups` tab to assign this policy to members or groups.

![](../iam/assets/rbac/enable-project-access-policy-assign-groups.png)

In the picture above, we assign the `policy/allow-access-project-a` policy to all groups that need to access `Project A`.

### Set Project Management Permissions

For groups like `Project Maintainers` and `Project Owner`, they need more permissions to manage the project, such as creating environments, creating feature flags, etc.

1. Go to the `Policies` page under `IAM` menu.
2. Click on `Add` button, input the policy name and description, then click `Save`.
3. In the policy detail page, click on `(+)` icon to add a new permission
    - Choose `Project` as the control-level (resource type).
    - Select the `project/project-a` in resource selector to assign management permissions for `Project A`.
    - In allow or deny selector, choose `Allow`.
    - In action selector, assign all permissions that the group needs. E.g. all permissions for project owner.

![](../iam/assets/rbac/enable-project-access-full-permission.png)

4. Click **Save** to save the permission.
5. Go to `Team` or `Groups` tab to assign this policy to members or groups.

![](../iam/assets/rbac/enable-project-access-policy-assign-groups-project-owner.png)

As shown in the picture above, we assign the `policy/project-a-owner-full-permission` policy to `Project A Owner` group. Because only project owner should have full management permissions for the project, such as deleting project.

## Environment Access Control

For each project, you can have multiple environments, such as `development`, `staging`, and `production`. You can also control who can access each environment and what management permissions they have for each environment.

For example, developers of Project A can see all environments under Project A, but they can only create and manage feature flags in the `development` environment. They can only read feature flags in the `production` environment.

### Enable User Access to Specific Environments

1. Go to the `Policies` page under `IAM` menu.
2. Click on `Add` button, input the policy name and description, then click `Save`.
3. In the policy detail page, click on `(+)` icon to add a new permission
4. Add a project access permission first, if not already added:
5. Add an environment access permission:
    - Choose `Environment` as the control-level (resource type).
    - Select the environment you want to allow access to in resource selector.
    - In allow or deny selector, choose `Allow`.
    - In action selector, choose `CanAccessEnvironment`.

![](../iam/assets/rbac/enable-env-access-policy.png)

As shown above, we create a policy to allow access to `dev` and `prod` environment in `Project A`.

6. Click **Save** to save the permission.
7. Assign this policy to members or groups in `Team` or `Groups` tab.

![](../iam/assets/rbac/enable-env-access-policy-assign-groups.png)

As shown above, we assign the policy to the `Project A Developers` related groups. They should all able to read feature flags in both `dev` and `prod` environments.

### Set Environment Management Permissions

We may assign a environment maintainer roles to allow them to modify environment settings, such as update environment secret. In this case, we need to create a policy to allow them to manage the environment, as image below:

![](../iam/assets/rbac/update-env-settings.png)

- Select `Environment` as the control-level (resource type).
- Select the specific environment in resource selector.
- In allow or deny selector, choose `Allow`.
- In action selector, choose `DeleteEnvSecret`, `CanAccessEnv` and `UpdateEnvSettings`.
- Save the permission and assign the policy to the related groups.

![](../iam/assets/rbac/assign-env-settings.png)

As shown above, we assign the policy to the member `project-a-owner@featbit.com`, who should be able to update environment settings.

## Feature Flag Access Control

### Enable User to Read Feature Flags of Specific Projects/Environments

### Enable User to Operate a Specific Feature Flag

### Disable User to Operate a Specific Feature Flag


## Example Walkthrough

- Project A and B. Each project has 2 environments (dev and prod)
- Dev Team A can only see Project A, and can only operate feature flags in dev env.
- Dev Team A can only create feature flags in pro env in Project A.
- The QA Team can see project A and project B, but can't operate feature flags.
- The PM team can do everything for project A except remove feature flags.
- Only Project Maintainer can remove feature flags.
