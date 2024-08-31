import {redirect} from "react-router-dom";
import {refreshToken} from "./accounts.js";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

async function createTopic({request}) {
    const requestBody = await request.formData();
    if (Cookies.get("isAuthenticated") === "false") {
        return redirect("/login");
    }

    let response;
    try {
        response = await fetch(API_URL + "topics/", {
            method: "POST",
            headers: getHeaders(),
            body: requestBody,
        },)
        if (response.ok) {
            return redirect("/topics");
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await createTopic({request: request});
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

async function loadTopics() {
    let response;
    try {
        response = await fetch(API_URL + "topics/")
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
        throw new Response("Server Issues", {status: 500});
    }
    throw response;
}

function getHeaders() {
    return {"Authorization": `Bearer ${Cookies.get("access")}`};
}