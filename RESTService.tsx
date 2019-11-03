import { AsyncStorage } from "react-native";

const RESTService = {
  api: "http://127.0.0.1:5000",

  post: (route: string, body: object, auth?: string) =>
    new Promise<Response>(async () => {
      const response = fetch(RESTService.api + route, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(body),
      });
      console.log(JSON.stringify(body));
      response.then(console.log).catch(console.error);
      return await response;
    }),

  get: (route: string, auth?: string) =>
    new Promise<Response>(async () => {
      const response = fetch(RESTService.api + route, {
        method: "GET",
        mode: "no-cors",
        headers: { authorization: `Bearer ${auth}` },
      });
      response.then(console.log).catch(console.error);
      return await response;
    }),

  register: (email: string, password: string, handle: string) =>
    RESTService.post("/account/register", {
      email: email,
      handle: handle,
      auth: btoa(`${email}:${password}`)
    })
      .then(() => {
        AsyncStorage.setItem("auth", btoa(`${email}:${password}`), console.error);
        console.debug('hit it!');
      })
      .catch(console.error),

  validateLogin: (email: string, password: string) => RESTService.get("/account/validate", btoa(`${email}:${password}`)),

  test: () => RESTService.get("/test"),
};

export { RESTService as default };
