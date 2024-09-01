import {Link, useLoaderData} from "react-router-dom";

export default function TopicsList() {
    const topics = useLoaderData();
    if (topics) {
        let topicsList = topics.map((topic) => (
            <ul key={topic.id}>
                {JSON.stringify(topic)}
                <Link to={`/topics/${topic.id}`}> comments</Link>
            </ul>
        ))
        return (
            <li>{topicsList}</li>
        )
    } else {
        return (
            <h3>Nothing Found.</h3>
        );
    }
}
