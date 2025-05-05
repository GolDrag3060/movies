import {getFilmById, getMovieImage} from "../../Api/apiURL.ts";
import {Image} from "antd";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import "./movie.css";



export const Movie = () => {
    const id = useParams().MovieId;
    const [movie, setMovie] = useState({});
    useEffect(() => {
        getFilmById(id).then(res =>
        {
            setMovie(res)
        })
    }, []);

    return (
        <div>
            <h2>{movie?.title}</h2>
            <Image width={400} src={getMovieImage(movie?.backdrop_path)}/>
            <p><b>Release date:</b> {movie?.release_date}</p>
            <h4>Description</h4>
            <p>{movie?.overview}</p>
            <div className={"genres"}>
                <h4>Genres:</h4>
                {movie.genres?movie?.genres.map(genre => <p key={genre.id}>{genre.name}</p>):null}
            </div>

        </div>
    )
}