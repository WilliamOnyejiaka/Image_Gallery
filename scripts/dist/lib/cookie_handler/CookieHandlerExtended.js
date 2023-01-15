import { LocalStorage, convertToMilliSeconds, } from "../../modules/utilities/utilities.js";
import { CookieHandler } from "./cookie_handler.js";
class CookieHandlerExtended extends CookieHandler {
    constructor() {
        super();
    }
    setCookieExpirationDate(name, expirationDate) {
        LocalStorage.setValue(name, expirationDate);
    }
    getCookieExpirationDate(name) {
        return LocalStorage.getValue(name);
    }
    setCookieExtended(name, value, age = { hours: 1 }) {
        this.setCookie(name, value, age);
        const expirationDate = new Date().getTime() + convertToMilliSeconds(age);
        const date = new Date(); //make this general
        date.setTime(date.getTime() + convertToMilliSeconds(age));
        this.setCookieExpirationDate(name, {
            dateString: date.toUTCString(),
            expirationDate: expirationDate,
        });
    }
}
export default CookieHandlerExtended;
