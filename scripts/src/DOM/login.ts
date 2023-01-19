import { CookieHandlerExtended } from "../lib/cookie_handler/cookie_handler.js";
import {AuthService} from './../services/services.js';

const cookieExtendedHandler = new CookieHandlerExtended();

async function login() {
  const data = await (new AuthService()).login("email", "password");
  cookieExtendedHandler.setCookieExtended("access", data.data.access_token,{hours:1});
  cookieExtendedHandler.setCookieExtended("refresh", data.data.refresh_token,{days:30});

  console.log(data);

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      name: data.data.user.name,
      email: data.data.user.email,
      userId: data.data.user.id,
      createdAt: data.data.user.created_at,
      updatedAt: data.data.user.updated_at,
    })
  );
}

login();
