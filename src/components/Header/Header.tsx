import {NavLink} from "react-router";
import {Button} from "antd";

const Header = () => {
    return (<>
            <div>
                    <Button><NavLink to="/">Home</NavLink></Button>
                    <Button><NavLink to="/about">About</NavLink></Button>
                    <Button><NavLink to="/login">Login</NavLink></Button>
                    <Button><NavLink to="/movies">Movies</NavLink></Button>
            </div>
        </>
    )
}

export default Header