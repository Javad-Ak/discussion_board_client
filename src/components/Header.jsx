import {Outlet, Link} from "react-router-dom";

function Header() {
    return (
        <>
            <Link to="/">DB  </Link>
            <Link to="/topics">Topics  </Link>
            <Link to="/profile/javad">Profile  </Link>
            <Outlet/>
        </>
    )
}

export default Header;