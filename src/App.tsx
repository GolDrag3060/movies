import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import {Movies} from "./components/Movies";
import {Register} from "./components/Register";
import {Login} from "./components/Login/login.tsx";
import {Movie} from "./components/Movies/Movie.tsx";
import {ProtectedRout} from "./components/ProtectedRout/ProtectedRout.tsx";
import {Favorites} from "./components/Favorites/Favorites.tsx";
import {SearchMovies} from "./components/SearchMovies/SearchMovies.tsx";



function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path={"/register"} element={<Register/>} />
                        <Route path={"/login"} element={<Login/>}/>
                    </Route>
                    <Route element={<ProtectedRout/>}>
                        <Route path="/" element={<Movies/>} />
                        <Route path="/favorites" element={<Favorites/>}/>
                        <Route path={"/movie/:MovieId"} element={<Movie/>}/>
                        <Route path={"/page/:PageNum"} element={<Movies/>}/>
                        <Route path={"/search/:title/page/:page"} element={<SearchMovies/>}/>
                    </Route>


                </Routes>
            </BrowserRouter>
        </>

    )
}

export default App
