import {useEffect, useState} from "react";
import {getFilmsByPage, getMovieImage,} from "../../Api/apiURL.ts";
import "./movies.css";
import {useNavigate} from "react-router";

export const Movies = () => {
    // const [page, setPage] = useState(1);
    interface Film {
        id: number;
        title: string;
        backdrop_path: string;
    }

    const [films, setFilms] = useState<Film[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFilmsByPage(1).then(res => setFilms(res.results))
    },[])

    const handleSingleMovie = (id:number) => {
        navigate(`/movie/${id}`)
    }

    return (
            <>
            {
                films.length ? films.map(film =>{
                    return(<div key={film.id} onClick={()=>handleSingleMovie(film.id)} className={"movie"}>
                        <div>{film.title}</div>
                        <img src={getMovieImage(film.backdrop_path)} alt={"Image"}/></div>)
                    }

                ) : <div>Loading...</div>

            }
            </>
            )
 }