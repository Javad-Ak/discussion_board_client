import {Link, useLoaderData} from "react-router-dom";
import TopicDetails from "./discussions/TopicDetails.jsx";
import {ListGroup} from "react-bootstrap";

export default function TopicsList() {
    const topics = useLoaderData();
    if (topics.length > 0) {
        let topicsList = topics.map((topic) => (
            <ListGroup.Item className="border-0" key={topic.id}>
                <TopicDetails topic={topic} showContent={false}/>
            </ListGroup.Item>
        ));
        return (
            <>
                <h2 className="text-center m-4">Latest topics</h2>
                <ListGroup>{topicsList}</ListGroup>
            </>

        );
    } else {
        return (
            <h2 className="text-center m-4">
                No topics Found!
            </h2>
        );
    }
}
