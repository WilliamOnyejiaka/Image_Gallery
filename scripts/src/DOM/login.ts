import { CookieHandlerExtended } from "../lib/cookie_handler/cookie_handler.js";
import {AuthService} from './../services/services.js';

const cookieExtendedHandler = new CookieHandlerExtended();

async function testl() {
  const data = await (new AuthService()).login("email", "password");
  cookieExtendedHandler.setCookieExtended("access", data.data.access_token,{hours:1});
  cookieExtendedHandler.setCookieExtended("refresh", data.data.refresh_token,{days:30});

  console.log(data);
}

testl();
