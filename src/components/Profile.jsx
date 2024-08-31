import {useLoaderData} from "react-router-dom";

export default function Profile() {
    const user = useLoaderData();
    return (
        <p>{JSON.stringify(user)}</p>
    )
}
