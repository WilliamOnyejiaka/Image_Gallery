import {CookieHandlerExtended} from "./../../lib/cookie_handler/cookie_handler.js";
import {AuthService} from './../../services/services.js';


class TokenHandler {
  cookieHandlerExtended: CookieHandlerExtended = new CookieHandlerExtended();

  async getToken() {
    let accessToken = this.cookieHandlerExtended.getCookie("access");
    let refreshToken = this.cookieHandlerExtended.getCookie("refresh");
    const accessExpirationDate: any = this.cookieHandlerExtended
      .getCookieExpirationDate("access");
    const refreshExpirationDate: any = this.cookieHandlerExtended
      .getCookieExpirationDate("refresh");
    if (
      accessToken &&
      accessExpirationDate.expirationDate > new Date().getTime()
    )
      return accessToken;
    if (
      refreshToken &&
      refreshExpirationDate.expirationDate > new Date().getTime()
    )
      return await this.getAccessToken(refreshToken);
    return null;
  }

  getAccessToken = async (refreshToken: string):Promise<any> => {
    const data: any = await (new AuthService()).getAccessToken(refreshToken);
    this.cookieHandlerExtended.setCookieExtended("access", data.access_token);
    
    return data.access_token;
  };
}

export default TokenHandler;