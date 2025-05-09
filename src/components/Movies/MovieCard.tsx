import {getFilmById, getMovieImage} from "../../Api/apiURL.ts";
import {Button, Image} from "antd";
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
        backdrop_path?: string;
        title?: string;
    }
    const [movie, setMovie] = useState<Movie>({});
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

            <Image style={{width:"300px"}} src={getMovieImage(movie?.backdrop_path)} onClick={()=>handleSingleMovie(id)}/>
            <h2>{movie?.title}</h2>
            <Button onClick={()=>handleFavoriteToggle(id)}
            icon={isFavorite(id) ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
            >{isFavorite(id)?'Delete from favorite':"Add to favorite"}</Button>

        </div>
    )
}