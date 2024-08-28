import {Link, useRouteError} from "react-router-dom";
import {MdErrorOutline} from "react-icons/md";
import {Container} from "react-bootstrap";
import {onPageLoaded} from "../actions/theme.js";

export default function ErrorPage() {
    document.addEventListener('DOMContentLoaded', onPageLoaded);
    let error = useRouteError();

    return (
        <Container className="bg-body-tertiary d-flex align-items-center"
                   style={{"minHeight": "100vh", "minWidth": "100vw"}}>
            <Container className="text-center justify-content-center">
                <MdErrorOutline size="10em" color="Red"/>
                <h1>Sorry, an error has occurred.</h1>
                <h3><i>{error.statusText || error.message}</i></h3>
                <Link className="btn btn-primary" to="/">Go home</Link>
            </Container>
        </Container>
    );
}