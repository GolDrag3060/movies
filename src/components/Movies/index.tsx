// @ts-ignore

import {useEffect, useState} from "react";
import {getFilmsByPage, getMovieImage, getPopularMovies,} from "../../Api/apiURL.ts";
import "./movies.css";
import {useNavigate, useParams} from "react-router";
import {Carousel, Pagination} from "antd";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCurrentUser} from "../../Slices/users.ts";
import {addFavorite, deleteFavorite, selectFavorites} from "../../Slices/favorites.ts";
import {MovieCard} from "./MovieCard.tsx";


export const Movies = () => {
    const [page, setPage] = useState<number>(Number(useParams().PageNum) || 1);
    const user = useAppSelector(selectCurrentUser);
    const favorites = useAppSelector(selectFavorites)[user]||[]
    const navigate = useNavigate();
    const [films, setFilms] = useState<Film[]>([]);
    const [popularMovies, setPopularMovies] = useState<Film[]>([]);
    const dispatch = useAppDispatch();


    const isFavorite =(id: number)=>{
        return favorites.includes(id)
    }

    const handleFavoriteToggle = (id: number) => {
        if (isFavorite(id)){
            dispatch(deleteFavorite({id, user}))
        }
        else {
            dispatch(addFavorite({user,id}))
        }
    }

    interface Film {
        id: number;
        title: string;
        backdrop_path: string;
        poster_path: string;
    }

    const handlePageChange = (page: number) => {
        setPage(page)
        navigate(`/page/${page}`)
        scroll(0,0)
    }




    useEffect(() => {
        getFilmsByPage(page).then(res => setFilms(res.results))
    },[page])

    useEffect(() => {
        getPopularMovies().then(res => setPopularMovies(res.results))
    },[page])


    return (
            <>

                <div className={"MoviesContainer"}>

                <div className={"Banner"}></div>
                    <h1>Popular Movies</h1>
                    <Carousel centerMode={true} centerPadding={"60px"} slidesToShow={5} autoplay >
                        {
                            popularMovies.length && popularMovies.map(film =>
                            <div>
                                <img style={{height:"100%",width:"90%"}}
                                    src={getMovieImage(film.poster_path)}
                                    onClick={()=>navigate(`/movie/${film.id}`)}
                                />
                            </div>)
                        }
                    </Carousel>
                    <h1>Movies</h1>
                <div className={"Movies"}>
            {
                films.length ? films.map(film =>{
                    return(<MovieCard isFavorite={isFavorite}  key={film.id} id={film.id} handleFavoriteToggle={handleFavoriteToggle}/>)
                    }
                ) : <div>Loading...</div>

            }
                </div>
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Pagination
                        current={page}
                        total={50 * 20}
                        pageSize={20}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        style={{ display: 'inline-block' }}
                    />
                </div>
                </div>
            </>
            )
 }