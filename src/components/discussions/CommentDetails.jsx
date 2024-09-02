import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Avatar from "react-avatar";
import PropTypes from "prop-types";

export default function CommentDetails({comment}) {
    const avatarSize = window.screen.width < 992 ? 32 : 38;
    const date = new Date(comment.date_added);

    return (
        <Card>
            <Card.Body>
                {comment.content}
            </Card.Body>
            <Card.Footer className="d-inline-flex align-items-center text-secondary">
                <Link to={`/profiles/${comment.username}`} className="me-auto link-secondary link-underline-opacity-0">
                    <Avatar name={comment.username} size={avatarSize} src={comment.avatar} round={true} className="me-2"/>
                    {comment.username}
                </Link>
                {date.toLocaleString()}
            </Card.Footer>
        </Card>
    )
}

CommentDetails.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        content: PropTypes.string.isRequired,
        date_added: PropTypes.string.isRequired,
    }),
}