import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

export default function TopicDetails({topic, showContent}) {
    const avatarSize = window.screen.width < 992 ? 32 : 38;

    let content = null;
    if (showContent === true) {
        content = (
            <Card.Text>
                {topic.content}
            </Card.Text>)
        ;
    }

    const date = new Date(topic.date_added);

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Link to={`/topics/${topic.id}`} className="link-primary link-underline-opacity-0">
                        {topic.title}
                    </Link>
                </Card.Title>
                {content}
            </Card.Body>
            <Card.Footer className="d-inline-flex align-items-center text-secondary">
                <Link to={`/profiles/${topic.username}`} className="me-auto link-secondary link-underline-opacity-0">
                    <Avatar name={topic.username} size={avatarSize} src={topic.avatar} round={true} className="me-2"/>
                    {topic.username}
                </Link>
                {date.toLocaleString()}
            </Card.Footer>
        </Card>
    )
}

TopicDetails.propTypes = {
    topic: PropTypes.object,
    showContent: PropTypes.bool,
}