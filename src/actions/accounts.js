import {redirect} from "react-router-dom";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

async function login({request}) {
    const requestBody = await request.formData()

    let response;
    try {
        response = await fetch(API_URL + "users/login/", {
            method: "POST",
            body: requestBody,
        },)
        if (response.ok) {
            const responseBody = await response.json();

            setCookies(true, responseBody.refresh, responseBody.access, requestBody.get("username"));
            return redirect("/topics");
        } else if (response.status === 401) {
            setCookies(false);
            return {message: "Unauthorized: Wrong credentials."};
        }
        setCookies(false);
    } catch (error) {
        console.log(error);
        setCookies(false);
        throw new Response("Server Issues", {status: 500});
    }
    setCookies(false);
    throw response;
}

async function signup({request}) {
    const requestBody = await request.formData()
    if (requestBody.get("confirmPassword") !== requestBody.get("password")) {
        return {message: "Passwords do not match."};
    }

    let response;
    try {
        response = await fetch(API_URL + "users/signup/", {
            method: "POST",
            body: requestBody,
        },)
        if (response.ok) {
            const username = requestBody.get("username");
            const password = requestBody.get("password");

            const loginResponse = await fetch(API_URL + "users/login/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: username, password: password}),
            },)
            if (loginResponse.ok) {
                const tokens = await loginResponse.json();
                setCookies(true, tokens.refresh, tokens.access, requestBody.get("username"));
                return redirect("/topics");
            }
        }
    } catch (error) {
        console.log(error);
        setCookies(false);
        throw new Response("Server Issues", {status: 500});
    }
    setCookies(false);
    if (Math.floor(response.status / 100) === 5) {
        throw new Response("Server Issues", {status: 500});
    } else {
        return response;
    }
}

async function refreshToken() {
    const refresh = Cookies.get("refresh");
    if (!refresh) {
        setCookies(false);
        return null;
    }

    const response = await fetch(API_URL + "users/login/refresh/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refresh: refresh}),
    },);
    if (response.ok) {
        const responseBody = await response.json();
        const access = responseBody.access;
        Cookies.set("access", access);
        return access;
    } else {
        setCookies(false);
        return null;
    }
}

function setCookies(isAuthenticated, refresh = "", access = "", username = "") {
    Cookies.set("isAuthenticated", isAuthenticated);
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    Cookies.set("username", username);
}

export {login, signup, refreshToken}