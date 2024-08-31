import {Container, Row, Col, Card} from 'react-bootstrap';
import {Form, Link, useActionData} from "react-router-dom";
import Avatar from "react-avatar";
import logo from '/logo.png';
import Navbar from "react-bootstrap/Navbar";

export default function LoginForm() {
    const avatarSize = window.screen.width < 992 ? 36 : 42;
    const errors = useActionData();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-1 justify-content-center">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Avatar src={logo} round={true} size={avatarSize}/> Discussion Board
                </Navbar.Brand>
            </Navbar>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Card>
                            <Card.Title className="text-center mt-2">
                                Account Login
                            </Card.Title>
                            <Card.Body>
                                <Form method="post">
                                    <div className="form-group mb-2">
                                        <label htmlFor="username">username</label>
                                        <input type="username"
                                               className="form-control"
                                               name="username"
                                               id="username"
                                               placeholder="username" required/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="password"
                                               id="password"
                                               placeholder="Password"
                                               required/>
                                    </div>

                                    {errors ? <p className="text-center text-danger">
                                        {Object.values(errors)[0] || "Something went wrong! Try again later."}
                                    </p> : null}
                                    <button type="submit" className="btn btn-primary w-100"
                                            disabled={navigation.state === "submitting"}>
                                        Login
                                    </button>
                                    <p className="text-center mt-1">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Don't have an account? <Link to="/signup">Signup</Link>
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}