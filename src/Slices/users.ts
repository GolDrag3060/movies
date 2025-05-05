import { createAppSlice } from "../app/createAppSlice.ts";

interface User {
    id: string;
    name: string;
}

const initialState = {
    currentUser: null as User | null,
    loggedIn: false,
}

export const usersSlice = createAppSlice({
    name: 'usersInfo',
    initialState,
    reducers: create => ({
        logIn: create.reducer((state, action:{payload:User}) => {
            state.currentUser = action.payload
            state.loggedIn = true;
        }),
        logOut:create.reducer((state)=>{
            state.currentUser = null;
            state.loggedIn = false;
        })
    }),
    selectors: {
        selectLoggedIn: state => state.loggedIn,
        selectCurrentUser: state => state.currentUser
    }
});

console.log('Log ::: todoSlice ===', usersSlice);

export const { logIn } = usersSlice.actions;
export const { selectLoggedIn,selectCurrentUser } = usersSlice.selectors;
export default usersSlice.reducer;