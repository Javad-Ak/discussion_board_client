import "fastbootstrap/dist/css/fastbootstrap.min.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Profile from "./components/Profile";
import Jumbotron from "./components/Jumbotron";
import TopicDetails from "./components/discussions/TopicDetails.jsx";
import TopicForm from "./components/discussions/TopicForm.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Login from "./components/accounts/Login.jsx";
import Signup from "./components/accounts/Signup.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Jumbotron/>}/>

                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="profiles/:username" element={<Profile/>}/>

                    <Route path="topics" element={<Topics/>}/>
                    <Route path="topics/draft" element={<TopicForm/>}/>
                    <Route path="topics/:topic_id" element={<TopicDetails/>}/>
                    <Route path="topics/:query" element={<SearchResults/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
