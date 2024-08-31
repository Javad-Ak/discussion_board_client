import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link, Form, useActionData, useNavigation} from "react-router-dom";
import Avatar from "react-avatar";
import logo from '/logo.png';
import Navbar from "react-bootstrap/Navbar";

export default function SignupForm() {
    const avatarSize = window.screen.width < 992 ? 36 : 42;
    const errors = useActionData();
    const navigation = useNavigation();

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
                                Account Signup
                            </Card.Title>
                            <Card.Body>
                                <Form method="post">
                                    <div className="form-group mb-2">
                                        <label htmlFor="first_name">first name</label>
                                        <input type="text"
                                               className="form-control"
                                               name="first_name"
                                               id="first_name"
                                               placeholder="first name" required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="last_name">last name</label>
                                        <input type="text"
                                               className="form-control"
                                               name="last_name"
                                               id="last_name"
                                               placeholder="last name" required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="email">email</label>
                                        <input type="text"
                                               className="form-control"
                                               name="email"
                                               id="email"
                                               placeholder="email" required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="username">username</label>
                                        <input type="username"
                                               className="form-control"
                                               name="username"
                                               id="username"
                                               placeholder="username" required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="password"
                                               id="password"
                                               placeholder="Password"
                                               required/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="confirmPassword">confirm password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="confirmPassword"
                                               id="confirmPassword"
                                               placeholder="confirm password"
                                               required/>
                                    </div>

                                    {errors ? <p className="text-center text-danger">
                                        {Object.values(errors)[0] || "Something went wrong! Try again later."}
                                    </p> : null}
                                    <button type="submit" className="btn btn-primary w-100"
                                            disabled={navigation.state === "submitting"}>
                                        Signup
                                    </button>
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
