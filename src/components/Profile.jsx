import {useParams} from "react-router-dom";

function Profile() {
    const params = useParams()
    return (
        <p>profile of {params.username}</p>
    )
}

export default Profile