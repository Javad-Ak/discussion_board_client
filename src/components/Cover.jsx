import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Cover() {
    return (
        <Container className="text-center mt-5">
            <h2>
                Share your ideas.
            </h2>
            <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                What's on your mind? Draft a topic, share your ideas and make comments in Discussion Board.
            </p>
            <Link to="/topics" className="btn btn-primary">
                Explore topics
            </Link>
        </Container>
    )
}