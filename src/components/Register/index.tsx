import {useRef} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth}   from "../../firebase.ts";


export const Register = () => {
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null)

    const handleRegister = ()=>{
        if (!userName.current?.value || !password.current?.value) return alert(
            "Please fill all fields"
        )
        try {
            createUserWithEmailAndPassword(auth,userName.current?.value+"@gmail.com",password.current.value)
        }
        catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
        }
    }

    return (
        <div>
            <label htmlFor={"userName"}>User Name</label>
            <input ref={userName} type={"text"} id={"Email"}/>
            <label htmlFor={"Password"}>Password</label>
            <input type={"password"} id={"Password"} ref={password}/>
            <button type="button" onClick={handleRegister}>Register</button>
        </div>
    )
}