import {Card} from "react-bootstrap";
import {Form, Link, useNavigation} from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "react-avatar";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";

export default function TopicDetails({topic, showContent}) {
    const avatarSize = window.screen.width < 992 ? 30 : 36;
    const navigation = useNavigation();

    let content = null;
    if (showContent === true) {
        content = (
            <Card.Text className="border-top mt-1 pt-1">
                {topic.content}
            </Card.Text>
        );
    }

    let deleteLink = null;
    if (showContent === true && Cookies.get("isAuthenticated") === "true" && topic.username === Cookies.get("username")) {
        deleteLink = (
            <Form method="DELETE">
                <input type="hidden" name="topic_pk" value={topic.id}/>
                <Button variant="link" className="link-secondary link-underline-opacity-0" size="sm"
                        type="submit" name="intent" value="deleteTopic" disabled={navigation.state === "submitting"}>
                    Delete
                </Button>
                <label className="me-2">|</label>
            </Form>
        );
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
                <Link to={`/profiles/${topic.username}`}
                      className="link-secondary link-underline-opacity-0 me-auto">
                    <Avatar name={topic.username} size={avatarSize} src={topic.avatar} round={true} className="me-2"/>
                    {topic.username}
                </Link>
                {deleteLink}
                <label>
                    {date.toLocaleDateString()}
                </label>
            </Card.Footer>
        </Card>
    )
}

TopicDetails.propTypes = {
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date_added: PropTypes.string.isRequired,
    }),
    showContent: PropTypes.bool,
}