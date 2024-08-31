import {Container, Row, Col, Card} from 'react-bootstrap';
import {Form, useActionData, useNavigation} from "react-router-dom";
import Cookies from "js-cookie";

export default function TopicForm() {
    const errors = useActionData();
    const navigation = useNavigation();

    if (Cookies.get("isAuthenticated") !== "true") {
        return (
            <p>login first</p>
        )
    } else {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Card>
                            <Card.Title className="text-center mt-2">
                                Draft and Create a new Topic
                            </Card.Title>
                            <Card.Body>
                                <Form method="post">
                                    <div className="form-group mb-2">
                                        <label htmlFor="title">title</label>
                                        <input type="text"
                                               className="form-control"
                                               name="title"
                                               id="title"
                                               placeholder="title" required/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="content">content</label>
                                        <input type="text"
                                               className="form-control"
                                               name="content"
                                               id="content"
                                               placeholder="content"
                                               required/>
                                    </div>

                                    {errors ? <p className="text-center text-danger">
                                        {Object.values(errors)[0] || "Something went wrong! Try again later."}
                                    </p> : null}
                                    <button type="submit" className="btn btn-primary w-100"
                                            disabled={navigation.state === "submitting"}>
                                        Submit
                                    </button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}