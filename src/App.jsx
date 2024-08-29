import "bootstrap/dist/css/bootstrap.min.css"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Profile from "./components/Profile";
import Jumbotron from "./components/Jumbotron";
import TopicDetails from "./components/discussions/TopicDetails.jsx";
import TopicForm from "./components/discussions/TopicForm.jsx";
import SearchResults from "./components/SearchResults.jsx";
import LoginForm from "./components/accounts/LoginForm.jsx";
import SignupForm from "./components/accounts/SignupForm.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import {login, signup} from "./actions/accounts.js";

// errors are handled via the provider
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm/>,
        errorElement: <ErrorPage/>,
        action: login,
    }, {
        path: "/signup",
        element: <SignupForm/>,
        errorElement: <ErrorPage/>,
        action: signup,
    }, {
        path: "/",
        element: <Header/>,
        index: <Jumbotron/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "profiles/:username",
                element: <Profile/>,
            }, {
                path: "topics",
                element: <Topics/>,
                children: [
                    {
                        path: ":topic_id",
                        element: <TopicDetails/>
                    }, {
                        path: "draft",
                        element: <TopicForm/>
                    }
                ]
            }, {
                path: "search/:query",
                element: <SearchResults/>,
            },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
