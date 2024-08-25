import {Outlet, Link} from "react-router-dom";
import {BiBrightnessHalf, BiSearch} from "react-icons/bi";
import {switchTheme, onPageLoaded} from "../actions/theme.js"
import {search} from "../actions/discussions.js"
import Button from 'react-bootstrap/Button';

import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav';
import Avatar from "react-avatar";
import Navbar from 'react-bootstrap/Navbar';
import logo from '/logo.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Header() {
    document.addEventListener('DOMContentLoaded', onPageLoaded);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-2">
                <Navbar.Brand as={Link} to="/">
                    <Avatar src={logo} size="40" className="h-100"/>
                    Discussion Board
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-2">
                        <Nav.Link as={Link} to="/topics">Topics</Nav.Link>
                        <Nav.Link as={Link} to="/topics/draft">Draft</Nav.Link>
                        <Nav.Item as={InputGroup}>
                            <Form.Control
                                placeholder="Search Topics..."
                                aria-label="search"
                                aria-describedby="searchBtn"
                            />
                            <Button variant="outline-secondary" id="searchBtn" onClick={search}>
                                <BiSearch size="1.2em"/>
                            </Button>
                        </Nav.Item>
                    </Nav>
                    <Nav className="gap-2">
                        <Nav.Item as={Button} onClick={switchTheme}>
                            <BiBrightnessHalf size="1.2em"/>
                        </Nav.Item>
                        <Nav.Item as={Link} to="/profiles/javad" className="bg-black">
                            <Avatar size="35" className="h-100" name="Javad"/>
                        </Nav.Item>
                        {Cookies.get("isAuthenticated") ?
                            <>
                                <Nav.Item as={Link} to="/profiles/javad">
                                    <Avatar size="35" name="Javad"/>
                                </Nav.Item>
                            </> :
                            <>
                                <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
                                <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </>
    );
}

export default Header;