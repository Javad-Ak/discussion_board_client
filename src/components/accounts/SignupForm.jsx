import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link, Form} from "react-router-dom";
import Avatar from "react-avatar";
import logo from '/logo.png';
import {onPageLoaded} from "../../actions/theme.js";
import Navbar from "react-bootstrap/Navbar";

export default function SignupForm() {
    document.addEventListener('DOMContentLoaded', onPageLoaded);
    const avatarSize = window.screen.width < 992 ? 36 : 42;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-1 justify-content-center">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Avatar src={logo} round={true} size={avatarSize}/> Discussion Board
                </Navbar.Brand>
            </Navbar>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Title className="text-center mt-2">
                                Account Signup
                            </Card.Title>
                            <Card.Body>
                                <Form method="post">
                                    <div className="form-group mb-2">
                                        <label htmlFor="username">username</label>
                                        <input type="username"
                                               className="form-control"
                                               id="username"
                                               placeholder="username" required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                               className="form-control"
                                               id="password"
                                               placeholder="Password"
                                               required/>
                                    </div>

                                    <button className="btn btn-primary w-100 mt-4">Signup</button>
                                    <p className="text-center mt-1">
                                        Already have an account? <Link to="/login">Login</Link>
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
