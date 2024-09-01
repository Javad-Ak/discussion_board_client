import {redirect} from "react-router-dom";
import {getHeaders, refreshToken} from "./accounts.js";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

async function createTopic({request, body}) {
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
                return await createTopic({body: requestBody});
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
        } else if (Math.floor(response.status / 100) === 4) {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw new Response("Server Issues", {status: 500});
    }
    throw response;
}

async function searchTopics({params}) {
    let response;
    try {
        response = await fetch(API_URL + `search/${params.query}/`);
        if (response.ok) {
            return await response.json();
        } else if (Math.floor(response.status / 100) === 4) {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw new Response("Server Issues", {status: 500});
    }
    throw response;
}

async function loadComments({params}) {
    let topicResponse, commentsResponse;
    try {
        topicResponse = await fetch(API_URL + `topics/${params.topic_id}/`);
        commentsResponse = await fetch(API_URL + `topics/${params.topic_id}/comments/`);

        if (topicResponse.ok) {
            if (commentsResponse.ok) {
                return [await topicResponse.json(), await commentsResponse.json()];
            } else if (commentsResponse.status === 404) {
                return [await topicResponse.json(), null];
            }
        } else if (topicResponse.status === 404) {
            return [null, null];
        }
    } catch (error) {
        console.log(error);
    }
    throw new Response("Server Issues", {status: 500});
}

async function createComment({params, request, body}) {
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
        response = await fetch(API_URL + `topics/${params.topic_id}/comments/`, {
            method: "POST",
            headers: getHeaders(),
            body: requestBody,
        },)
        if (response.ok) {
            return redirect(`/topics/${params.topic_id}`);
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await createComment({body: requestBody});
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

export {loadTopics, createTopic, searchTopics, loadComments, createComment}