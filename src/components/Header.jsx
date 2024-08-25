import {Outlet, Link} from "react-router-dom";
// import Cookies from "js-cookie"
import {BiBrightnessHalf, BiSearch} from "react-icons/bi";
import {search} from "../actions/discussions.js"
import {switchTheme, onPageLoaded} from "../actions/theme.js"

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '/logo.png';
import avatar from '../assets/avatar.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Header() {
    document.addEventListener('DOMContentLoaded', onPageLoaded);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" fixed="top" bg="bg-discovery">
                <Navbar.Brand as={Link} to="/">
                    <img className="avatar avatar-lg bg-transparent" src={logo} alt="logo"/>
                    Discussion Board
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/topics" className="nav-item">Topics</Nav.Link>
                        <Nav.Link as={Link} to="/topics/draft" className="nav-item">Draft</Nav.Link>
                        <Nav.Item as={InputGroup} className="nav-item">
                            <Form.Control
                                placeholder="Search Topics"
                                aria-label="search"
                                aria-describedby="searchBtn"
                            />
                            <Button variant="outline-secondary" id="searchBtn" onClick={search}>
                                <BiSearch size="1.5em"/>
                            </Button>
                        </Nav.Item>
                    </Nav>
                    <Nav className="me-3">
                        <Nav.Item as={Button} onClick={switchTheme} className="bg-transparent">
                            <BiBrightnessHalf size="1.5em"/>
                        </Nav.Item>
                        <Nav.Item as={Link} to="/profile/javad" className="nav-item">
                            <img className="avatar avatar-lg bg-transparent" src={avatar} alt="avatar"/>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </>
    );
}

// <div>
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//             <Link to="/" className="navbar-brand">
//                 <img src={logo} alt="logo" className="avatar"/>
//                 Discussion Board
//             </Link>
//
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                     data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
//                     aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//
//             <div className="collapse navbar-collapse" id="navbarCollapse">
//                 <ul className="navbar-nav me-auto gap-2">
//                     <li className="nav-item">
//                         <Link to="/topics" className="nav-link">
//                             Topics
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <div className="input-group border rounded-2">
//                             <input type="text" id="searchBox" placeholder="Search Topics..." aria-label="Search"
//                                    className="form-control border-0"/>
//                             <div className="input-group-append">
//                                 <button onClick={search} className="btn border-0">
//                                     <BiSearch/>
//                                 </button>
//                             </div>
//                         </div>
//                     </li>
//                 </ul>
//
//                 <ul className="navbar-nav ms-auto mb-2 mb-md-0 gap-1 bg-black">
//                     <li className="nav-item">
//                         <button onClick={switchTheme} className="btn border-0">
//                             <BiBrightnessHalf/>
//                         </button>
//                     </li>
//                     {Cookies.get("isAuthenticated") ?
//                         <>
//                             <li className="nav-item">
//                                 <Link to="/profile/javad" className="btn btn-primary">
//                                     Profile
//                                 </Link>
//                             </li>
//                         </> :
//                         <>
//                             <li className="nav-item">
//                                 <Link to="/signup" className="btn btn-primary">
//                                     Sign up
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="/login" className="btn btn-primary">
//                                     Log in
//                                 </Link>
//                             </li>
//                         </>}
//                 </ul>
//             </div>
//
//         </div>
//     </nav>
//     <Outlet/>
// </div>

export default Header;