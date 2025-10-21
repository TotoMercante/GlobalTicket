export * from "./generated";

import { EventApi, UserApi, Configuration } from "./generated";

const config = new Configuration({ basePath: "http://localhost:5000" });

const apis: { event?: EventApi; user?: UserApi } = {};

export function getEventApi() {
  return apis.event || (apis.event = new EventApi(config));
}

export function getUserApi() {
  return apis.user || (apis.user = new UserApi(config));
}
