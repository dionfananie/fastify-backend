## Authentication

This branch contains authentication modules that signup and set token into cookies into client/browser
playing token in cookies such as set cookies httponly, expires.
set httponly for avoiding XSS cyber attack.

A cookie with the HttpOnly attribute can't be modified by JavaScript, for example using Document.cookie; it can only be modified when it reaches the server. Cookies that persist user sessions for example should have the HttpOnly attribute set — it would be really insecure to make them available to JavaScript. This precaution helps mitigate cross-site scripting (XSS) attacks.

[HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

### Generate jwt key cli

```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
