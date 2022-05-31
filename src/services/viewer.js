import { viewerBase } from "./";
import * as qs from "qs";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

const body = qs.stringify({
  grant_type: "client_credentials",
  client_id: "XXX",
  client_secret: "XXX",
  scope: "data:read data:write"
});

const viewerService = {
  get: (url) => viewerBase.get(url),
  post: (url) =>
    viewerBase.post(url, body, {
      headers: headers
    })
};

export default viewerService;
