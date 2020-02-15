/* eslint no-restricted-globals: 0 */

import auth0 from 'auth0-js';
import jwtDecode from "jwt-decode";

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "dev--k0qd7zi.auth0.com",
        clientID: "1Ce0F3gaVetP8OGw7ZmjotsJJxb521mZ",
        redirectUri: "http://localhost:3000/callback",
        responseType: "token id_token",
        scope: "openid profile"
        // audience: "https://dev--k0qd7zi.auth0.com",
    })

    constructor() {
        this.login = this.login.bind(this)
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            if (authResults && authResults.accessToken && authResults.idToken) {
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;
            } else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        })
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        location.pathname = LOGIN_FAILURE_PAGE;
    }

    getProfile() {
        if (localStorage.getItem("id_token")) {
            jwtDecode(localStorage.getItem("id_token"))
        } else {
            return {};
        }
    }
}