import {Button} from "antd";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase.ts";
import {useRef} from "react";
import {useNavigate} from "react-router";

export const Login = () => {
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const handleLogin = () => {
        if (!userName.current?.value || !password.current?.value ) return
        signInWithEmailAndPassword(auth,userName.current?.value+"@gmail.com",password.current.value).then(res => {
            console.log(res.user)
        })

    }

    return (
        <>
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

        </>

    )
}