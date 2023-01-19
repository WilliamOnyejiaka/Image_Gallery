import { TokenHandler } from "./main.js";

async function loggedIn(callback: Function) {
  const tokenHandler: TokenHandler = new TokenHandler();
  const token = await tokenHandler.getToken();
  if (token) {
    callback(token);
  } else {
    window.location.href = "/templates/login.html";
  }
}

export default loggedIn;
