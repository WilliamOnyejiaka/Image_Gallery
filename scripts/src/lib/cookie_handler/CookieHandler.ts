import { convertToMilliSeconds } from "../../modules/utilities/utilities.js";

class CookieHandler {
  getCookie(name: string): string {
    let cookies: any = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumelator, [key, value]) => ({
          ...accumelator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

    return cookies[name];
  }

  setCookie(cname: string, value: string, age: any) {
    let nameAndValue = `${encodeURIComponent(cname)}=${encodeURIComponent(
      value
    )}`;
    const date = new Date();
    date.setTime(date.getTime() + convertToMilliSeconds(age));
    document.cookie = `${nameAndValue};path=/;expires=${date.toUTCString()}`;
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=expired;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export default CookieHandler;
