import {Form, useActionData, useLoaderData, useNavigation} from "react-router-dom";

export default function CommentsList() {
    const [topic, comments] = useLoaderData();
    const navigation = useNavigation();
    const errors = useActionData();
    const form = (<Form method="post">
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
    </Form>);

    if (topic) {
        if (comments) {
            let commentsList = comments.map((comment) => (
                <ul key={comment.id}>
                    {JSON.stringify(comment)}
                </ul>
            ))

            return (
                <>
                    <h3>{JSON.stringify(topic)}</h3>
                    {form}
                    <li>{commentsList}</li>
                </>
            );
        } else {
            return (
                <>
                    <h3>{JSON.stringify(topic)}</h3>
                    {form}
                </>
            );
        }
    } else {
        return (
            <h3>Nothing Found.</h3>
        );
    }
}