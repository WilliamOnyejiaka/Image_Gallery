import {
  LocalStorage,
  convertToMilliSeconds,
} from "../../modules/utilities/utilities.js";

import {CookieHandler} from "./cookie_handler.js";

class CookieHandlerExtended extends CookieHandler {
  constructor() {
    super();
  }

  setCookieExpirationDate(name: string, expirationDate:any):void {
    LocalStorage.setValue(name, expirationDate);
  }

  getCookieExpirationDate(name:string) {
    return LocalStorage.getValue(name);
  }

  setCookieExtended(name:string, value:string, age:any = { hours: 1 }):void {
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
