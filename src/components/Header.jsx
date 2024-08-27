import {Outlet, Link, useNavigate} from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import {switchTheme, onPageLoaded} from "../actions/theme.js"
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import {PiCircleHalfFill} from "react-icons/pi";

import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav';
import Avatar from "react-avatar";
import Navbar from 'react-bootstrap/Navbar';
import logo from '/logo.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Header() {
    document.addEventListener('DOMContentLoaded', onPageLoaded);

    const avatarSize = window.screen.width < 992 ? 36 : 42;
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-2">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Avatar src={logo} round={true} size={avatarSize}/> Discussion Board
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-2">
                        <Nav.Link as={Link} to="/topics">Topics</Nav.Link>
                        <Nav.Link as={Link} to="/topics/draft">Draft</Nav.Link>
                        <Nav.Item as={InputGroup} className="border rounded-5">
                            <Form.Control placeholder="Search" aria-describedby="addOn" size="sm" value={query}
                                          className="border-0 rounded-5 bg-transparent"
                                          onChange={(e) => setQuery(e.target.value)}/>
                            <Button variant="outline-secondary" id="addOn"
                                    className="border-0 rounded-5"
                                    onClick={() => {
                                        query && navigate(`/search/${query}`);
                                        setQuery("");
                                    }}>
                                <BiSearch size="1.2em"/>
                            </Button>
                        </Nav.Item>
                        <Nav.Link onClick={switchTheme}>
                            <PiCircleHalfFill size="1.2em"/>
                        </Nav.Link>
                    </Nav>
                    {Cookies.get("isAuthenticated") ?
                        <Nav>
                            <Nav.Link as={Link} to="/profiles/javad">
                                <Avatar round={true} size={avatarSize - 5} name="Javad"/>
                            </Nav.Link>
                        </Nav>
                        :
                        <Nav className="gap-2">
                            <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
                            <Nav.Link as={Link} to="/login" className="link-primary">Log in</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </>
    );
}

export default Header;