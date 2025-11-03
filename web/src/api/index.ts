export * from "./generated";

import { getAccessToken } from "@auth0/nextjs-auth0";
import { EventApi, UserApi, Configuration } from "./generated";

const config = new Configuration({
  basePath: "http://localhost:5000",
  accessToken: () => getAccessToken(),
});

const apis: { event?: EventApi; user?: UserApi } = {};

export function getEventApi() {
  return apis.event || (apis.event = new EventApi(config));
}

export function getUserApi() {
  return apis.user || (apis.user = new UserApi(config));
}
