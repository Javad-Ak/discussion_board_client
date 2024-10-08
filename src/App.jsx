import "bootstrap/dist/css/bootstrap.min.css"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import TopicsList from "./components/TopicsList.jsx";
import Profile from "./components/Profile";
import TopicForm from "./components/discussions/TopicForm.jsx";
import SearchResults from "./components/SearchResults.jsx";
import LoginForm from "./components/accounts/LoginForm.jsx";
import SignupForm from "./components/accounts/SignupForm.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import {editUser, loadUser, login, profileActions, signup} from "./actions/accounts.js";
import Cover from "./components/Cover.jsx";
import CommentsList from "./components/CommentsList.jsx";
import {onPageLoaded} from "./actions/theme.js";
import {loadTopics, createTopic, searchTopics, loadComments, topicsActions} from "./actions/discussions.js";
import ProfileForm from "./components/accounts/ProfileForm.jsx";

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
        errorElement: <ErrorPage/>,
        loader: loadUser,
        children: [
            {
                path: "",
                element: <Cover/>,
                index: true,
            }, {
                path: "profiles/:username",
                element: <Profile/>,
                loader: loadUser,
                action: profileActions,
            }, {
                path: "profiles/:username/edit",
                element: <ProfileForm/>,
                loader: loadUser,
                action: editUser,
            }, {
                path: "topics",
                element: <TopicsList/>,
                loader: loadTopics,
            }, {
                path: "topics/draft",
                element: <TopicForm/>,
                action: createTopic
            }, {
                path: "topics/:topic_id",
                element: <CommentsList/>,
                loader: loadComments,
                action: topicsActions,
            }, {
                path: "search/:query",
                element: <SearchResults/>,
                loader: searchTopics,
            },
        ],
    },
]);

function App() {
    if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener('DOMContentLoaded', onPageLoaded);
    } else {
        // `DOMContentLoaded` has already fired
        onPageLoaded();
    }

    return (
        <RouterProvider router={router}/>
    )
}

export default App
