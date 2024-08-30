import {redirect} from "react-router-dom";

async function login({request}) {
    const data = await request.json;
    console.log(data.get("username"));
    return redirect("/")
}

async function signup() {
    console.log("signup")
    return redirect("/")
}

export {login, signup}