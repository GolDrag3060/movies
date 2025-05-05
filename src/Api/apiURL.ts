import {Params} from "react-router";

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzlmMzY4MTM4Mzk1MmVmNGVjYWQwYzk5YWRkMjg1NSIsIm5iZiI6MS43NDYzNzM4NzUxMTY5OTk5ZSs5LCJzdWIiOiI2ODE3OGNmM2QwYzFjNTU4NmQ5MTM2ODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._TUsDcow59chNXw6spTeF4vruBTlAMeolzFUkBwZB00'
    }
};

const GET_FILMS_URL = 'https://api.themoviedb.org/3/discover/movie?language=en-US&page=';
const GET_FILM_URL = 'https://api.themoviedb.org/3/movie/';
const GET_IMAGES_URL = 'https://image.tmdb.org/t/p/original';

export const getFilmsByPage = (page:number) => {
    return fetch(`${GET_FILMS_URL}${page}`, options)
        .then(res => res.json())
}

export const getFilmById = (id: Readonly<Params<string>>) => {
    return fetch(`${GET_FILM_URL}${id}`, options)
        .then(res => res.json())
}

export const getMovieImage = (path: string) => {
    return `${GET_IMAGES_URL}${path}`
}