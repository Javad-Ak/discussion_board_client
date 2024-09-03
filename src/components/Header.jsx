import {Outlet, Link, useNavigate, useLoaderData} from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import {switchTheme} from "../actions/theme.js"
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import {PiCircleHalfFill} from "react-icons/pi";

import Nav from 'react-bootstrap/Nav';
import Avatar from "react-avatar";
import Navbar from 'react-bootstrap/Navbar';
import logo from '/logo.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Header() {
    useEffect(makeResponsive, []);
    window.addEventListener('resize', makeResponsive);

    const avatarSize = window.screen.width < 992 ? 36 : 42;
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const user = useLoaderData();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary py-1 px-2" sticky="top">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Avatar src={logo} round={true} size={avatarSize}/> Discussion Board
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ms-2 gap-2">
                        <Nav.Link as={Link} to="/topics">Topics</Nav.Link>
                        <Nav.Link as={Link} to="/topics/draft">Draft</Nav.Link>
                        <Nav.Item id="searchBox" className="d-flex gap-1">
                            < InputGroup className="border rounded-5">
                                <Form.Control placeholder="Search" aria-describedby="addOn" size="sm" value={query}
                                              className="border-0 rounded-5 bg-transparent"
                                              onChange={(e) => setQuery(e.target.value)}/>
                                <Button variant="outline-secondary" id="addOn" className="border-0 rounded-5"
                                        onClick={() => {
                                            query && navigate(`/search/${query}`);
                                            setQuery("");
                                        }}>
                                    <BiSearch size="1.2em"/>
                                </Button>
                            </InputGroup>
                        </Nav.Item>
                    </Nav>
                    <Nav id="secondNav">
                        {user ?
                            <Nav.Item className="d-flex align-items-center gap-2">
                                <Button onClick={switchTheme} variant="" id="themeToggle"
                                        className="border-0 rounded-5 bg-transparent">
                                    <PiCircleHalfFill size="1.2em"/>
                                </Button>
                                <Link to={`/profiles/${user.username}`}>
                                    <Avatar round={true} size={avatarSize - 5} name={user.username} src={user.avatar}/>
                                </Link>
                            </Nav.Item>
                            :
                            <Nav.Item className="d-inline-flex align-items-center gap-2">
                                <Button onClick={switchTheme} variant="" id="themeToggle"
                                        className="border-0 rounded-5 bg-transparent">
                                    <PiCircleHalfFill size="1.2em"/>
                                </Button>
                                <Button variant="outline-primary"
                                        onClick={() => navigate('/login')}>Log in</Button>
                                <Button variant="outline-primary"
                                        onClick={() => navigate('/signup')}>Sign up</Button>
                            </Nav.Item>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="m-2" style={{fontSize: "0.9rem"}}>
                <Outlet/>
            </div>
        </>
    );
}

function makeResponsive() {
    try {
        if (window.innerWidth < 992) {
            document.getElementById("searchBox").className = "d-flex gap-2 order-first mt-2";
            document.getElementById("secondNav").className = "d-flex border-top mt-2 p-2";
            document.getElementById("themeToggle").className = "border-0 rounded-5 order-last bg-transparent";
        } else {
            document.getElementById("searchBox").className = "d-flex gap-2 order-last"
            document.getElementById("secondNav").className = "";
            document.getElementById("themeToggle").className = "border-0 rounded-5 order-first bg-transparent";
        }
    } catch (e) {
        console.warn(e)
    }
}
