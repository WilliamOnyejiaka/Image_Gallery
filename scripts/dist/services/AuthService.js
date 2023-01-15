var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AuthService {
    constructor() {
        this.baseUrl = "/api/routes/auth";
    }
    getAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/token/access-token`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            return yield response.json();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/login`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: "Basic " + window.btoa(`${email}:${password}`),
                },
            });
            return yield response.json();
        });
    }
    signUp(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/sign-up`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });
            return yield response.json();
        });
    }
}
export default AuthService;
