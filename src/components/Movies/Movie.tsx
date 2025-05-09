import {getFilmById, getMovieImage, getMovieTrailer} from "../../Api/apiURL.ts";
import {Button, Image} from "antd";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import "./movie.css";
import {addFavorite, deleteFavorite, selectFavorites} from "../../Slices/favorites.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCurrentUser} from "../../Slices/users.ts";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";



export const Movie = () => {
    const id = Number(useParams().MovieId);
    const [movie, setMovie] = useState<{
        title?: string;
        backdrop_path?: string;
        release_date?: string;
        overview?: string;
        genres?: Array<{id: number, name: string}>;
    }>({});
    const user = useAppSelector(selectCurrentUser);
    const favorites = useAppSelector(selectFavorites)[user]||[]
    const dispatch = useAppDispatch();
    const [trailer, setTrailer] = useState(null)
    const isFavorite =(id: number)=>{
        return favorites.includes(id)
    }

    const handleFavoriteToggle = (id: number) => {
        if (isFavorite(Number(id))){
            dispatch(deleteFavorite({id, user}))
        }
        else {
            dispatch(addFavorite({user,id}))
        }
    }

    useEffect(() => {
        getFilmById(id).then(res =>
        {
            setMovie(res)
        })
        getMovieTrailer(id).then(res => {
                setTrailer(res.results[0]?.key)
            }
        )
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
            {trailer&&<iframe src={`https://www.themoviedb.org/video/play?key=${trailer}`}
            allowFullScreen></iframe>}

            <Button
                onClick={()=>handleFavoriteToggle(Number(id))}
                icon={isFavorite(id) ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
            >
                {isFavorite(id)?'Delete from favorite':"Add to favorite"}</Button>

        </div>
    )
}