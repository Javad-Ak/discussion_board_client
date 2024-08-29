import {redirect} from "react-router-dom";

async function login() {
    console.log("login")
    return redirect("/")
}

async function signup() {
    console.log("signup")
    return redirect("/")
}

export {login, signup}