import { AsyncStorage } from "react-native";
import base64 from "react-native-base64";

const btoa = base64.encode;

const RESTService = {
  api: "http://127.0.0.1:5000",

  post: async (route: string, body: object, auth?: string) => {
    const response = fetch(RESTService.api + route, {
      method: "POST",
      mode: "no-cors",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      }),
      body: JSON.stringify(body),
    });
    console.log('Response:', JSON.stringify(body));
    response.then(console.log).catch(() => console.log(`Request for route ${route} failed`));
    return await response;
  },

  get: async (route: string, auth?: string) => {
    const response = fetch(RESTService.api + route, {
      method: "GET",
      mode: "no-cors",
      headers: new Headers({ "Authorization": `Basic ${auth}` }),
    });
    response.then(console.log).catch(() => console.log(`Request for route ${route} failed`));
    return await response;
  },

  register: (email: string, password: string, handle: string) =>
    RESTService.post("/account/register", {
      email: email,
      handle: handle,
      auth: btoa(`${email}:${password}`)
    }, btoa(`${email}:${password}`))
      .then(() => {
        AsyncStorage.setItem("auth", btoa(`${email}:${password}`));
        console.debug('Created user');
      })
      .catch(console.error),

  validateCredentials: (email: string, password: string) => RESTService.get("/account/validate/", btoa(`${email}:${password}`)),

  test: () => RESTService.get("/test"),
};

export { RESTService as default };
