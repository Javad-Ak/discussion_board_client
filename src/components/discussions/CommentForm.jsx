import {Form, useActionData, useNavigation} from "react-router-dom";
import Cookies from "js-cookie";
import {BiSend} from "react-icons/bi";

export default function CommentForm() {
    const errors = useActionData();
    const navigation = useNavigation();

    if (Cookies.get("isAuthenticated") !== "true") {
        return (
            <p className="text-center text-info p-4">login to add comments!</p>
        )
    } else {
        return (
            <>
                <Form method="post" id="form" className="input-group align-items-center mb-1">
                    <input type="text" className="form-control" placeholder="Make a comment..." name="content"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit"
                                disabled={navigation.state === "submitting"}>
                            <BiSend></BiSend>
                        </button>
                    </div>
                </Form>
                {errors ? <p className="text-center text-danger">
                    {Object.values(errors)[0] || "Something went wrong! Try again later."}
                </p> : null}
            </>
        );
    }
}
