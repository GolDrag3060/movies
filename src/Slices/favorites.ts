import { createAppSlice } from "../app/createAppSlice.ts";


const initialState = {
    favorites:JSON.parse(<string>localStorage.getItem('favorites')) || {},
}

export const favoriteSlice = createAppSlice({
    name: 'favorites',
    initialState,
    reducers: create => ({
        addFavorite: create.reducer((state, action: { payload: { user: string; id: number } }) => {
            state.favorites[action.payload.user]??=[];
            state.favorites[action.payload.user].push(action.payload.id);
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        }),
        deleteFavorite:create.reducer((state, action: { payload: { user: string; id: number } })=>{
            state.favorites[action.payload.user]=state.favorites[action.payload.user].filter((id: number)=>id!==action.payload.id)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        })
    }),
    selectors: {
        selectFavorites: state => state.favorites,
    }
});



export const { addFavorite,deleteFavorite} = favoriteSlice.actions;
export const { selectFavorites } = favoriteSlice.selectors;
export default favoriteSlice.reducer;