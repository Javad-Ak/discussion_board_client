import {Card} from "react-bootstrap";
import {Form, Link, useNavigation} from "react-router-dom";
import Avatar from "react-avatar";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";

export default function CommentDetails({comment}) {
    const avatarSize = window.screen.width < 992 ? 30 : 36;
    const date = new Date(comment.date_added);
    const navigation = useNavigation();

    let deleteLink = null;
    if (Cookies.get("isAuthenticated") === "true" && comment.username === Cookies.get("username")) {
        deleteLink = (
            <Form method="DELETE">
                <input type="hidden" name="topic_pk" value={comment.topic_pk}/>
                <input type="hidden" name="comment_pk" value={comment.id}/>
                <Button variant="link" className="link-secondary link-underline-opacity-0" size="sm"
                        type="submit" name="intent" value="deleteComment" disabled={navigation.state === "submitting"}>
                    Delete
                </Button>
                <label className="me-2">|</label>
            </Form>
        );
    }

    return (
        <Card>
            <Card.Body>
                {comment.content}
            </Card.Body>
            <Card.Footer className="d-inline-flex align-items-center text-secondary">
                <Link to={`/profiles/${comment.username}`}
                      className="link-secondary link-underline-opacity-0 me-auto">
                    <Avatar name={comment.username} size={avatarSize}
                            src={comment.avatar} round={true} className="me-2"/>
                    {comment.username}
                </Link>
                {deleteLink}
                <label>
                    {date.toLocaleDateString()}
                </label>
            </Card.Footer>
        </Card>
    )
}

CommentDetails.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic_pk: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        content: PropTypes.string.isRequired,
        date_added: PropTypes.string.isRequired,
    }),
}