import {useAppSelector} from "../../app/hooks.ts";
import {selectLoggedIn} from "../../Slices/users.ts";
import {Navigate, Outlet} from "react-router";
import Header from "../Header/Header.tsx";

export const ProtectedRout = () => {
    const loggedIn = useAppSelector(selectLoggedIn);
    return (
        <>
            <Header/>
            {loggedIn?<Outlet/>:<Navigate to="/login"/>}
        </>
    )

}