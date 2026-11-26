---
title: FAQ
---

### Why do I get logged out after five minutes?

**Q:** My FeatBit API is deployed behind a path prefix such as `/deployment-prefix/manage`. Why does the portal return to the login page after five minutes?

**A:** The browser must send the refresh token cookie when the access token expires. If the cookie's path does not include your public API prefix, the browser will omit it from the refresh request and session renewal will fail.

Set `Authentication__RefreshTokenCookiePath` on the **API service** to the full public identity path. For example, if the refresh endpoint is `/deployment-prefix/manage/api/v1/identity/refresh-token`, add the following environment variable to the API service's existing configuration in `docker-compose.yml`:

```yaml
api-server:
  environment:
    - Authentication__RefreshTokenCookiePath=/deployment-prefix/manage/api/v1/identity
```

Replace `/deployment-prefix/manage` with your actual public API prefix. The value must start with `/` and end with `/api/v1/identity`.
