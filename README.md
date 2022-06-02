# Autodesk-pixelcompare

Create POC to AUTODESK Support

# Config Credentials

Before you start using the app. It is important to configure the credentials to BIM360.

viewer.js

```
const body = qs.stringify({
  grant_type: "client_credentials",
  client_id: "XXX",
  client_secret: "XXX",
  scope: "data:read data:write"
});
```

# Configure two URN to compare

We also need to set up two document URNs to be able to compare using the pixel compare extension.

viewerForge.js

```
const options = {
    env: "AutodeskProduction2",
    language: "en",
    api: "streamingV2",
    config3d: {
      extensions: ["Autodesk.Viewing.PixelCompare"]
    },
    getAccessToken: (onSuccess) => getAccessToken(onSuccess),
    urn1: "urn:URN_TO_DOCUMENT",
    urn2: "urn:URN_TO_DOCUMENT"
  };
```
