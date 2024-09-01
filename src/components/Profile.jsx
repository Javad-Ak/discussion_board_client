import {Form, useLoaderData} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Avatar from "react-avatar";
import Cookies from "js-cookie";

export default function Profile() {
    const avatarSize = window.screen.width < 992 ? 92 : 100;
    const user = useLoaderData();

    let form = null;
    if (user.username === Cookies.get("username") && Cookies.get("isAuthenticated")) {
        form = (
            <Row  className="border-top mt-2 pt-1">
                <Form method="POST">
                    <button type="submit" name="intent" value="edit"
                            className="btn btn-link link-primary link-underline-opacity-0">
                        Edit Profile
                    </button>
                </Form>
                <Form method="POST">
                    <button type="submit" name="intent" value="logout"
                            className="btn btn-link link-danger link-underline-opacity-0">
                        Logout of Account
                    </button>
                </Form>
                <Form method="POST">
                    <button type="submit" name="intent" value="delete"
                            className="btn btn-link link-danger link-underline-opacity-0">
                        Delete this Account
                    </button>
                </Form>
            </Row>
        );
    }

    return (
        <Container className="py-3 px-4">
            <Row xs={1}>
                <Col  className="d-flex mb-1 justify-content-center">
                    <Avatar name={user.username} src={user.avatar} round={true} size={avatarSize}/>
                </Col>
                <Col className="text-center">
                    <p className="text-primary h5">
                        {user.first_name + " " + user.last_name}
                    </p>
                    <p className="text-secondary h6">
                        {user.username}
                    </p>
                </Col>
            </Row>

            <Row>
                Bio: {user.bio}
            </Row>
            {form}
        </Container>
    )
}
