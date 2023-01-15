class AuthService {
  private baseUrl: string;
  public constructor() {
    this.baseUrl = "/api/routes/auth";
  }

  public async getAccessToken(refreshToken: string) {
    const response: any = await fetch(`${this.baseUrl}/token/access-token`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    return await response.json();
  }

  public async login(email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Basic " + window.btoa(`${email}:${password}`),
      },
    });
    return await response.json();
  }

  public async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const response: Response = await fetch(`${this.baseUrl}/sign-up`, {
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

    return await response.json();
  }
}

export default AuthService;
