import { useState} from "react";
import {addFavorite, deleteFavorite, selectFavorites} from "../../Slices/favorites.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {MovieCard} from "../Movies/MovieCard.tsx";
import {selectCurrentUser} from "../../Slices/users.ts";
import "../Movies/movies.css";


export const Favorites = () => {
    const user = useAppSelector(selectCurrentUser);
    const [favorites,setFavorites] = useState(useAppSelector(selectFavorites)[user]||[])
    const dispatch = useAppDispatch();


    const isFavorite =(id: number)=>{
        return favorites.includes(id)
    }

    const handleFavoriteToggle = (id:number) => {
        if (isFavorite(id)){
            dispatch(deleteFavorite({id, user}))
            setFavorites(favorites.filter((item: number) => item !== id))
        }
        else {
            dispatch(addFavorite({user,id}))
        }
    }

    return (
        <div className={"Movies"}>
            {
                favorites.length ? favorites.map((id: number) =>{
                        return(<MovieCard id={id} isFavorite={isFavorite} handleFavoriteToggle={handleFavoriteToggle} />)
                    }

                ) : <div>Loading...</div>

            }
        </div>
    )
}