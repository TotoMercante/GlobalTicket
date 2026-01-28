export * from "./generated";

import { auth0 } from "@/auth0";
import {
  Configuration,
  EventApi,
  ManagerRequestApi,
  ProfileApi,
  RegisterApi,
  UserApi,
} from "./generated";

const config = new Configuration({
  basePath: "http://localhost:5000",
  accessToken: () => auth0.getAccessToken().then((res) => res.token),
});

const apis: {
  event?: EventApi;
  user?: UserApi;
  profile?: ProfileApi;
  register?: RegisterApi;
  managerRequest?: ManagerRequestApi;
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

export function getManagerRequestApi() {
  return (
    apis.managerRequest || (apis.managerRequest = new ManagerRequestApi(config))
  );
}
