import {getActorImage, getFilmById, getMovieCast, getMovieImage, getMovieTrailer} from "../../Api/apiURL.ts";
import {Button, Card, Carousel, Image} from "antd";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import "./movie.css";
import {addFavorite, deleteFavorite, selectFavorites} from "../../Slices/favorites.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { selectCurrentUser} from "../../Slices/users.ts";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

type Actor = {
    name: string;
    img: string;
}

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
    const [actors, setActors] = useState<Actor[]>([])
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
    useEffect(() => {
        getMovieCast(id).then(res=>{
            setActors(res.cast.filter((actor: {profile_path:string}) => actor.profile_path).map((actor: { name: string; profile_path: string; }) => ({name: actor.name, img: actor.profile_path})))})
    }, []);
    console.log(actors)

    return (
        <div className={"singleMovieCard"} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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

            <h4>Actors</h4>
            <Carousel style={{width:"100vw"}} centerMode={true} centerPadding={"60px"} slidesToShow={9} autoplay>
                {
                    actors.length&&actors.map((actor)=>{
                           return (<div className={"actor"}>
                            <Card style={{width:100,height:150}} cover={<img  src={getActorImage(actor.img)}/>}>
                                {actor.name}
                            </Card>
                        </div>)
                    })
                }
            </Carousel>
        </div>
    )
}