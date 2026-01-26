export * from "./generated";

import { getAccessToken } from "@auth0/nextjs-auth0";
import {
  EventApi,
  UserApi,
  Configuration,
  ProfileApi,
  RegisterApi,
} from "./generated";

const config = new Configuration({
  basePath: "http://localhost:5000",
  accessToken: () => getAccessToken(),
});

const apis: {
  event?: EventApi;
  user?: UserApi;
  profile?: ProfileApi;
  register?: RegisterApi;
} = {};

export function getEventApi() {
  return apis.event || (apis.event = new EventApi(config));
}

export function getUserApi() {
  return apis.user || (apis.user = new UserApi(config));
}

export function getProfileApi() {
  return apis.profile || (apis.profile = new ProfileApi(config));
}

export function getRegisterApi() {
  return apis.register || (apis.register = new RegisterApi(config));
}
