var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CookieHandlerExtended } from "../lib/cookie_handler/cookie_handler.js";
import { AuthService } from './../services/services.js';
const cookieExtendedHandler = new CookieHandlerExtended();
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (new AuthService()).login("email", "password");
        cookieExtendedHandler.setCookieExtended("access", data.data.access_token, { hours: 1 });
        cookieExtendedHandler.setCookieExtended("refresh", data.data.refresh_token, { days: 30 });
        console.log(data);
        localStorage.setItem("currentUser", JSON.stringify({
            name: data.data.user.name,
            email: data.data.user.email,
            userId: data.data.user.id,
            createdAt: data.data.user.created_at,
            updatedAt: data.data.user.updated_at,
        }));
    });
}
login();
