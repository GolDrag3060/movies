import { createAppSlice } from "../app/createAppSlice.ts";



const initialState = {
    currentUser:JSON.parse(<string>localStorage.getItem('currentUser')) || null,
    loggedIn: !!localStorage.getItem('currentUser'),
}

export const usersSlice = createAppSlice({
    name: 'usersInfo',
    initialState,
    reducers: create => ({
        logIn: create.reducer((state, action:{payload:string}) => {
            state.currentUser = action.payload
            state.loggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
        }),
        logOut:create.reducer((state)=>{
            state.currentUser = null;
            state.loggedIn = false;
            localStorage.removeItem('currentUser')
        })
    }),
    selectors: {
        selectLoggedIn: state => state.loggedIn,
        selectCurrentUser: state => state.currentUser
    }
});



export const { logIn ,logOut} = usersSlice.actions;
export const { selectLoggedIn,selectCurrentUser } = usersSlice.selectors;
export default usersSlice.reducer;