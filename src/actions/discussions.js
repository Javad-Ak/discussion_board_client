import {redirect} from "react-router-dom";
import {getHeaders, refreshToken} from "./accounts.js";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

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
            method: "POST", headers: getHeaders(), body: requestBody,
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

async function topicsActions({request}) {
    const data = await request.formData();

    const intent = data.get("intent");
    data.delete("intent");
    const topic_pk = data.get("topic_pk");
    data.delete("topic_pk");

    switch (intent) {
        case "createComment": {
            return await createComment(topic_pk, data);
        }
        case "deleteComment": {
            const comment_pk = data.get("comment_pk");
            data.delete("comment_pk");
            return await deleteComment(topic_pk, comment_pk);
        }
        case "deleteTopic": {
            return await deleteTopic(topic_pk);
        }
        default:
            return null;
    }
}

async function createComment(topic_id, body) {
    if (Cookies.get("isAuthenticated") !== "true") {
        return redirect("/login");
    }

    let response;
    try {
        response = await fetch(API_URL + `topics/${topic_id}/comments/`, {
            method: "POST", headers: getHeaders(), body: body,
        },)
        if (response.ok) {
            return redirect(`/topics/${topic_id}`);
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await createComment(topic_id, body);
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

async function deleteTopic(id) {
    if (Cookies.get("isAuthenticated") !== "true") {
        return redirect("/login");
    }

    let response;
    try {
        response = await fetch(API_URL + `topics/${id}/`, {
            method: "DELETE", headers: getHeaders(),
        },)
        if (response.ok) {
            return redirect(`/topics`);
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await deleteTopic(id);
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

async function deleteComment(topic_id, comment_id) {
    if (Cookies.get("isAuthenticated") !== "true") {
        return redirect("/login");
    }

    let response;
    try {
        response = await fetch(API_URL + `topics/${topic_id}/comments/${comment_id}/`, {
            method: "DELETE", headers: getHeaders(),
        },)
        if (response.ok) {
            return redirect(`/topics/${topic_id}`);
        } else if (Math.floor(response.status / 100) === 4) {
            if (response.status === 401) {
                await refreshToken();
                return await deleteComment(topic_id, comment_id);
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

export {loadTopics, createTopic, searchTopics, loadComments, topicsActions}