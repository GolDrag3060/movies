import {NavLink, useNavigate,} from "react-router";
import {Button, Dropdown} from "antd";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {logOut, selectCurrentUser, selectLoggedIn} from "../../Slices/users.ts";
import Search from "antd/es/input/Search";


const Header = () => {
    const loggedIn = useAppSelector(selectLoggedIn);
    const userEmail = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logOut())
    }
    const handleSearch = (value: string) => {
        if (value) navigate(`/search/${value}/page/1`)
        else navigate("/")
    }
    return (<>
            <header style={{marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center",width:"50%" ,marginLeft:"25%"}}>
                    <Button><NavLink to="/">Home</NavLink></Button>
                    <Button><NavLink to="/favorites">Favorites</NavLink></Button>
                {loggedIn?<Dropdown menu={{items:[
                        {
                            key: '1',
                            label: (
                                <Button onClick={handleLogout} >Log Out</Button>
                            ),
                        },
                    ]}}>
                    <Button>{userEmail}</Button>
                    </Dropdown>:<div><Button><NavLink to="/login">Login</NavLink></Button></div>}
                    <Search  onSearch={handleSearch} style={{width:"200px"}}></Search>
                </header>

        </>
    )
}

export default Header