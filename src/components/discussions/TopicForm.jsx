import {Container, Row} from 'react-bootstrap';
import {Form, Link, useActionData, useNavigation} from "react-router-dom";
import Cookies from "js-cookie";

export default function TopicForm() {
    const errors = useActionData();
    const navigation = useNavigation();

    if (Cookies.get("isAuthenticated") !== "true") {
        return (
            <p className="text-center text-danger p-4">login first!</p>
        )
    } else {
        return (
            <Container className="py-4 px-4">
                <h2 className="text-center mb-4">Create a topic</h2>
                <Row>
                    <Form method="post" id="form">
                        <div className="form-group mb-3">
                            <label htmlFor="title">Choose a title.</label>
                            <input type="text"
                                   className="form-control"
                                   name="title"
                                   id="title"
                                   placeholder="title"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="content">Tell others what you think.</label>
                            <textarea form="form"
                                      rows="5"
                                      className="form-control"
                                      name="content"
                                      id="content"
                                      placeholder="content"/>
                        </div>

                        {errors ? <p className="text-center text-danger">
                            {Object.values(errors)[0] || "Something went wrong! Try again later."}
                        </p> : null}
                        <button type="submit" className="btn btn-primary me-2"
                                disabled={navigation.state === "submitting"}>
                            Submit
                        </button>
                        <Link to="/topics" className="btn btn-danger"
                              disabled={navigation.state === "submitting"}>
                            Cancel
                        </Link>
                    </Form>
                </Row>
            </Container>
        );
    }
}