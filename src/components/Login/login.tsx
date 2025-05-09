import {Button} from "antd";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase.ts";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {logIn, selectLoggedIn} from "../../Slices/users.ts";
import "./login.css";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    },[])

    const handleLogin = () => {
        if (!userName.current?.value || !password.current?.value ) return
        signInWithEmailAndPassword(auth,userName.current?.value,password.current.value).then(res => {
            dispatch(logIn(String(res.user.email)))
            navigate("/")
        })
    }

    return (
        <>
            <div className={"Login"}>
            <div style={{display: "flex"}}>
                <label style={{width:"100px",textAlign: "center"}} htmlFor={"userName"}>User Name</label>
                <input ref={userName} type={"text"} id={"Email"}/>
            </div>
            <div style={{display: "flex"}}>
                <label style={{width:"100px"}} htmlFor={"Password"}>Password</label>
                <input type={"password"} id={"Password"} ref={password}/>
            </div>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={()=>navigate("/register")}>Register</Button>
            </div>
        </>

    )
}