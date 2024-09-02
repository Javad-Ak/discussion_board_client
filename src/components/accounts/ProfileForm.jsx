import {Form, Link, useActionData, useLoaderData, useNavigation} from "react-router-dom";
import Cookies from "js-cookie";
import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import Avatar from "react-avatar";

export default function ProfileForm() {
    const avatarSize = window.screen.width < 992 ? 92 : 100;

    const errors = useActionData();
    const user = useLoaderData();
    const navigation = useNavigation();

    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState(user.avatar);

    if (Cookies.get("isAuthenticated") !== "true") {
        return (
            <p className="text-center text-danger p-4">login first!</p>
        )
    } else {
        return (
            <Container className="py-3 px-4">
                <h2 className="text-center mb-4">Edit your profile</h2>
                <Row xs={1} className="mb-4">
                    <Col className="d-flex mb-1 justify-content-center">
                        <Avatar name={user.username} src={avatar} round={true} size={avatarSize}/>
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
                    <Form method="post" encType="multipart/form-data">
                        <div className="form-group mb-3">
                            <label htmlFor="bio">Tell others about yourself in your bio.</label>
                            <input type="text"
                                   className="form-control"
                                   name="bio"
                                   id="bio"
                                   placeholder="bio"
                                   value={bio}
                                   onChange={(e) => setBio(e.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="avatar">Choose an avatar or keep the previous one.</label>
                            <input type="file"
                                   className="form-control"
                                   name="avatar"
                                   id="avatar"
                                   accept="image/*"
                                   placeholder="test"
                                   onChange={(e) => {
                                       const file = e.target.files[0];
                                       const reader = new FileReader();

                                       reader.readAsDataURL(file);
                                       reader.onload = (e) => setAvatar(e.target.result);
                                   }}/>
                        </div>

                        {errors ? <p className="text-center text-danger">
                            {Object.values(errors)[0] || "Something went wrong! Try again later."}
                        </p> : null}
                        <button type="submit" className="btn btn-primary me-2"
                                disabled={navigation.state === "submitting"}>
                            Submit
                        </button>
                        <Link to={`/profiles/${user.username}`} className="btn btn-danger"
                              disabled={navigation.state === "submitting"}>
                            Cancel
                        </Link>
                    </Form>
                </Row>
            </Container>
        );
    }
}