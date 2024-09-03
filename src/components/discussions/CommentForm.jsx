import {Form, useNavigation} from "react-router-dom";
import Cookies from "js-cookie";
import {BiSend} from "react-icons/bi";
import PropTypes from "prop-types";

export default function CommentForm({topic_id}) {
    const navigation = useNavigation();

    if (Cookies.get("isAuthenticated") !== "true") {
        return (
            <p className="text-center text-info p-2">login to add comments!</p>
        )
    } else {
        return (
            <Form method="post" id="form" className="input-group">
                <input type="hidden" name="topic_pk" value={topic_id}/>
                <input type="text" className="form-control" placeholder="Make a comment..." name="content"/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit" name="intent" value="createComment"
                            disabled={navigation.state === "submitting"}>
                        <BiSend></BiSend>
                    </button>
                </div>
            </Form>
        );
    }
}

CommentForm.propTypes = {
    topic_id: PropTypes.number.isRequired,
}
