export * from "./generated";

import { auth0 } from "@/auth0";
import {
  Configuration,
  EventApi,
  EventTicketApi,
  ManagerRequestApi,
  ProfileApi,
  RegisterApi,
  UserApi,
} from "./generated";

const config = new Configuration({
  basePath: "http://localhost:5000",
  accessToken: () => auth0.getAccessToken().then((res) => res.token),
  middleware: [
    {
      async onError(ctx) {
        console.dir({ response: ctx.response, error: ctx.error });
      },
      async post(ctx) {
        console.dir({ ...ctx.response, url: ctx.url, ...ctx.init });
      },
    },
  ],
});

const apis: {
  event?: EventApi;
  user?: UserApi;
  profile?: ProfileApi;
  register?: RegisterApi;
  managerRequest?: ManagerRequestApi;
  eventTicket?: EventTicketApi;
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

export function getEventTicketApi() {
  return apis.eventTicket || (apis.eventTicket = new EventTicketApi(config));
}
