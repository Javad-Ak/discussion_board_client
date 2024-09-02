import {useLoaderData} from "react-router-dom";
import {Container, ListGroup} from "react-bootstrap";
import TopicDetails from "./discussions/TopicDetails.jsx";
import CommentDetails from "./discussions/CommentDetails.jsx";
import CommentForm from "./discussions/CommentForm.jsx";

export default function CommentsList() {
    const [topic, comments] = useLoaderData();

    if (topic) {
        let commentsList = null;
        if (comments) {
            commentsList = comments.map((comment) => (
                <ListGroup.Item className="border-0" key={comment.id}>
                    <CommentDetails comment={comment} showContent={true}/>
                </ListGroup.Item>
            ))
        }
        return (
            <Container>
                <h2 className="text-center m-4">Discuss this topic</h2>
                <TopicDetails topic={topic} showContent={true}/>
                <CommentForm/>
                <ListGroup className="m-2 border-0">{commentsList}</ListGroup>
            </Container>
        );

    } else {
        return (
            <p className="text-center text-primary p-4">Nothing Found!</p>
        );
    }
}