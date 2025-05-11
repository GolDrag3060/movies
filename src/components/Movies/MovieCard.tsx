import {getFilmById, getMovieImage} from "../../Api/apiURL.ts";
import {Button} from "antd";
import {useEffect, useState} from "react";
import "./movie.css";
import {useNavigate} from "react-router";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';


export const MovieCard = ({id, isFavorite, handleFavoriteToggle}: {
    id: number;
    isFavorite: (id: number) => boolean;
    handleFavoriteToggle: (id: number) => void;
}) => {
    interface Movie {
        poster_path: string | undefined;
        title?: string;
    }
    const [movie, setMovie] = useState<Movie>({poster_path: undefined, title: ""});
    const navigate = useNavigate();

    useEffect(() => {
        getFilmById(id).then(res =>
        {
            setMovie(res)
        })
    }, [isFavorite]);

    const handleSingleMovie = (id:number) => {
        navigate(`/movie/${id}`)
    }
    return (
        <div className={"movie"}>
            <div className={"imageContainer"} >
                <img src={getMovieImage(movie?.poster_path)} onClick={()=>handleSingleMovie(id)}/>
            </div>
            <h3>{movie?.title}</h3>
            <Button style={{width:"70%"}} onClick={()=>handleFavoriteToggle(id)}
            icon={isFavorite(id) ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
            >{isFavorite(id)?'Delete from favorite':"Add to favorite"}</Button>

        </div>
    )
}