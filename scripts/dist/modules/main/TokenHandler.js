var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CookieHandlerExtended } from "./../../lib/cookie_handler/cookie_handler.js";
import { AuthService } from './../../services/services.js';
class TokenHandler {
    constructor() {
        this.cookieHandlerExtended = new CookieHandlerExtended();
        this.getAccessToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (new AuthService()).getAccessToken(refreshToken);
            this.cookieHandlerExtended.setCookieExtended("access", data.access_token);
            return data.access_token;
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken = this.cookieHandlerExtended.getCookie("access");
            let refreshToken = this.cookieHandlerExtended.getCookie("refresh");
            const accessExpirationDate = this.cookieHandlerExtended
                .getCookieExpirationDate("access");
            const refreshExpirationDate = this.cookieHandlerExtended
                .getCookieExpirationDate("refresh");
            if (accessToken &&
                accessExpirationDate.expirationDate > new Date().getTime())
                return accessToken;
            if (refreshToken &&
                refreshExpirationDate.expirationDate > new Date().getTime())
                return yield this.getAccessToken(refreshToken);
            return null;
        });
    }
}
export default TokenHandler;
