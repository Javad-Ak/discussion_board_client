import {useParams} from "react-router-dom";

export default function Profile() {
    const params = useParams()
    return (
        <p>profile of {params.username}</p>
    )
}
