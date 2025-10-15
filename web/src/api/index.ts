export * from "./generated";

import { EventApi, UserApi } from "./generated";

const apis: { event?: EventApi; user?: UserApi } = {};

export function getEventApi() {
  return apis.event || (apis.event = new EventApi());
}

export function getUserApi() {
  return apis.user || (apis.user = new UserApi());
}
