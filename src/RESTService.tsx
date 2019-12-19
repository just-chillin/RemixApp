import { AsyncStorage } from "react-native";
import base64 from "react-native-base64";

const btoa = base64.encode;

/**
 * Helper class that
 */
const RESTService = {
  api: "http://127.0.0.1:5000",

  // Helper function that handles a POST api call.
  post: async (route: string, body: object, auth?: string) => {
    const response = fetch(RESTService.api + route, {
      method: "POST",
      mode: "no-cors",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      }),
      body: JSON.stringify(body)
    });
    console.log("Response:", JSON.stringify(body));
    response
      .then(console.log)
      .catch(() => console.log(`Request for route ${route} failed`));
    return await response;
  },

  // Helper function that handles a GET api call.
  get: async (route: string, auth?: string) => {
    const response = fetch(RESTService.api + route, {
      method: "GET",
      mode: "no-cors",
      headers: new Headers({ Authorization: `Basic ${auth}` })
    });
    response
      .then(console.log)
      .catch(() => console.log(`Request for route ${route} failed`));
    return await response;
  },

  // Registers a user with the api, and if the call was sucessful saves the auth token to AsyncStorage.
  register: (email: string, password: string, handle: string) =>
    RESTService.post(
      "/account/register",
      {
        email: email,
        handle: handle,
        auth: btoa(`${email}:${password}`)
      },
      btoa(`${email}:${password}`)
    )
      .then(() => {
        AsyncStorage.setItem("auth", btoa(`${email}:${password}`));
        console.debug("Created user");
      })
      .catch(console.error),

  // Validates a user's credentials against the api. If the credentials are valid returns a 200 response code, otherwise returns a 401 (Unauthorized) code.
  validateCredentials: (email: string, password: string) =>
    RESTService.get("/account/validate/", btoa(`${email}:${password}`)),

  // Just does a simple test against the api. Should simply return a 200 response code. If this fails you should assume the api is down.
  test: () => RESTService.get("/test")
};

export default RESTService;
