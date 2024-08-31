import {useLoaderData} from "react-router-dom";

export default function TopicsList() {
    const topics = useLoaderData();
    if (topics) {
        let topicsList = topics.map((topic) => (
            <ul key={topic.id}>{JSON.stringify(topic)}</ul>
        ))
        return (
            <li>{topicsList}</li>
        )
    } else {
        return (<p>
            empty
        </p>);
    }
}
