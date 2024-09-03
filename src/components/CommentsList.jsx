import {useActionData, useLoaderData} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import TopicDetails from "./discussions/TopicDetails.jsx";
import CommentDetails from "./discussions/CommentDetails.jsx";
import CommentForm from "./discussions/CommentForm.jsx";

export default function CommentsList() {
    const [topic, comments] = useLoaderData();
    const errors = useActionData();

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
            <ListGroup>
                <ListGroup.Item className="border-0" key="_title">
                    <h2 className="text-center m-4">Discuss this topic</h2>
                </ListGroup.Item>
                <ListGroup.Item className="border-0" key="_topic">
                    <TopicDetails topic={topic} showContent={true}/>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 mt-1 mb-1" key="_form">
                    <CommentForm topic_id={topic.id}/>
                    {errors ? <p className="text-center text-danger mt-1">
                        {Object.values(errors)[0] || "Something went wrong! Try again later."}
                    </p> : null}
                </ListGroup.Item>
                <ListGroup.Item className="border-0" key="_comments">
                    <ListGroup className="m-1">{commentsList}</ListGroup>
                    <p className="text-center text-info mt-1">{comments.length} comments made.</p>
                </ListGroup.Item>
            </ListGroup>
        );

    } else {
        return (
            <p className="text-center text-primary p-4">Nothing Found!</p>
        );
    }
}