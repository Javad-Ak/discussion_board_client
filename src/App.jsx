import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Profile from "./components/Profile";
import Jumbotron from "./components/Jumbotron";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Jumbotron/>}/>
                    <Route path="topics" element={<Topics/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
