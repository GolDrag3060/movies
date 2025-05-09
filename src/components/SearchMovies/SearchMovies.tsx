
import {useEffect, useState} from "react";
import { getFilmsByPage,  searchMoviesByTitle,} from "../../Api/apiURL.ts";
import { useNavigate, useParams} from "react-router";
import { Pagination} from "antd";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCurrentUser} from "../../Slices/users.ts";
import {addFavorite, deleteFavorite, selectFavorites} from "../../Slices/favorites.ts";
import {MovieCard} from "../Movies/MovieCard.tsx";


export const SearchMovies = () => {
    const [page, setPage] = useState<number>(Number(useParams().PageNum) || 1);
    const user = useAppSelector(selectCurrentUser);
    const favorites = useAppSelector(selectFavorites)[user]||[]
    const navigate = useNavigate();
    const [films, setFilms] = useState<Film[]>([]);
    const searchValue = useParams().title;
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
    }

    const handlePageChange = (page: number) => {
        setPage(page)
        navigate(`/search/${searchValue}/page/${page}`)
    }



    useEffect(() => {
        if (searchValue) {
            searchMoviesByTitle(searchValue,page).then(res => setFilms(res.results))
        }
        else {
            getFilmsByPage(page).then(res => setFilms(res.results))
        }
    }, [searchValue,page]);





    return (
        <>
            <div className={"MoviesContainer"}>
                <div className={"Banner"}></div>
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