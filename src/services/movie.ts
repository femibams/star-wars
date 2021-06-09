import axios from 'axios';

const fetchMovies = async (url: string) => {
    return axios({
        method: 'get',
        baseURL: 'https://swapi.dev/api',
        url
    });
}

export const MovieService = {
    fetchMovies
}
  