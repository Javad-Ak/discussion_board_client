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
        } else if (Math.floor(response.status / 100) === 4) {
            setCookies(false);
            return await response.json() || {"message": "Something went wrong. Try again later."};
        }
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
            } else if (Math.floor(loginResponse.status / 100) === 4) {
                setCookies(false);
                return await loginResponse.json() || {"message": "Something went wrong. Try again later."};
            }
        } else if (Math.floor(response.status / 100) === 4) {
            setCookies(false);
            return await response.json() || {"message": "Something went wrong. Try again later."};
        }
    } catch (error) {
        console.log(error);
        setCookies(false);
        throw new Response("Server Issues", {status: 500});
    }
    setCookies(false);
    throw response;
}

async function refreshToken() {
    const refresh = Cookies.get("refresh");
    if (!refresh) {
        setCookies(false);
        return;
    }

    const response = await fetch(API_URL + "users/login/refresh/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refresh: refresh}),
    },);
    if (response.ok) {
        const responseBody = await response.json();
        const access = responseBody.access;
        Cookies.set("access", access, {sameSite: 'strict'});
    } else {
        setCookies(false);
    }
}

async function loadUser(inputs) {
    let username;
    if (inputs.params && inputs.params.username) {
        username = inputs.params.username;
    } else if (Cookies.get("username")) {
        username = Cookies.get("username");
    } else {
        return null;
    }

    let response;
    try {
        response = await fetch(API_URL + `users/${username}/`)
        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw new Response("Server Issues", {status: 500});
    }
    throw response;
}

async function profileActions({request, params}) {
    const data = await request.formData();
    switch (data.get("intent")) {
        case "logout":
            return await logout();
        case "delete":
            return await deleteUser();
        case "edit":
            return redirect(`/profiles/${params.username}/edit`);
        default:
            return null;
    }
}

async function logout() {
    setCookies(false);
    return redirect("/");
}

async function deleteUser() {
    const username = Cookies.get("username");
    if (!username) {
        setCookies(false);
        return redirect("/");
    }
    if (Cookies.get("isAuthenticated") !== "true") {
        return redirect("/login");
    }

    let response;
    try {
        response = await fetch(API_URL + `users/${username}/`, {
            method: "DELETE",
            headers: getHeaders(),
        },)
        if (response.ok) {
            setCookies(false);
            return redirect(`/`);
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await deleteUser();
            } else {
                return await response.json() || {"message": "Something went wrong. Try again later."};
            }
        }
    } catch (error) {
        console.log(error);
        throw new Response("Server Issues", {status: 500});
    }
    throw response;
}

async function editUser({request, params, body}) {
    let requestBody;
    if (body) {
        requestBody = body;
    } else {
        requestBody = await request.formData();
    }
    if (Cookies.get("isAuthenticated") !== "true") {
        return redirect("/login");
    }

    let response;
    try {
        response = await fetch(API_URL + `users/${params.username}/`, {
            method: "PATCH",
            headers: getHeaders(),
            body: requestBody,
        },)
        if (response.ok) {
            return redirect(`/profiles/${params.username}`);
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await editUser({body: requestBody});
            } else {
                return await response.json() || {"message": "Something went wrong. Try again later."};
            }
        }
    } catch (error) {
        console.log(error);
        throw new Response("Server Issues", {status: 500});
    }
    throw response;
}

function setCookies(isAuthenticated, refresh = "", access = "", username = "") {
    Cookies.set("isAuthenticated", isAuthenticated, {sameSite: 'strict'});
    Cookies.set("access", access, {sameSite: 'strict'});
    Cookies.set("refresh", refresh, {sameSite: 'strict'});
    Cookies.set("username", username, {sameSite: 'strict'});
}


function getHeaders() {
    return {"Authorization": `Bearer ${Cookies.get("access")}`};
}

export {login, signup, refreshToken, loadUser, getHeaders, editUser, profileActions}