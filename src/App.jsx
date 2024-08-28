import "bootstrap/dist/css/bootstrap.min.css"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Profile from "./components/Profile";
import Jumbotron from "./components/Jumbotron";
import TopicDetails from "./components/discussions/TopicDetails.jsx";
import TopicForm from "./components/discussions/TopicForm.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Login from "./components/accounts/Login.jsx";
import Signup from "./components/accounts/Signup.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

// errors are handled via the provider
const router = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        index: <Jumbotron/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "signup",
                element: <Signup/>,
            },
            {
                path: "profiles/:username",
                element: <Profile/>,
            },
            {
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
            },
            {
                path: "search",
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
