import './App.css'
import {BrowserRouter, Route,  Routes} from "react-router";
import Home from "./components/Home";
import About from "./components/About/About.tsx";
import {Layout} from "./components/Layout/Layout.tsx";
import {Movies} from "./components/Movies";
import {Register} from "./components/Register";
import {Login} from "./components/Login/login.tsx";
import {Movie} from "./components/Movies/Movie.tsx";



function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>} />
                        <Route path="/about" element={<About/>}/>
                        <Route path={"/register"} element={<Register/>} />
                        <Route path={"/movies"} element={<Movies/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/movie/:MovieId"} element={<Movie/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>

    )
}

export default App
