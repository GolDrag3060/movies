import {useEffect, useRef} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth}   from "../../firebase.ts";
import {useNavigate} from "react-router";
import {selectLoggedIn} from "../../Slices/users.ts";
import {useAppSelector} from "../../app/hooks.ts";
import "./register.css";
import {Button, Card} from "antd";

export const Register = () => {
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null)
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {navigate("/")
        }
    },[])

    const handleRegister = ()=>{
        if (!userName.current?.value || !password.current?.value) return alert(
            "Please fill all fields"
        )
        try {
            createUserWithEmailAndPassword(auth,userName.current?.value,password.current.value)
            navigate("/login")
        }
        catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
        }
    }

    return (
        <Card style={{display: "flex", flexDirection: "column", alignItems: "center" , justifyContent:"space-evenly",width:"300px",margin:"0 auto",marginTop: "25vh"}}>

            <label htmlFor={"userName"}>User Name</label>
            <input ref={userName} type={"text"} id={"Email"}/>
            <label htmlFor={"Password"}>Password</label>
            <input type={"password"} id={"Password"} ref={password}/>
            <Button style={{marginTop:10}} onClick={handleRegister}>Register</Button>
        </Card>
    )
}