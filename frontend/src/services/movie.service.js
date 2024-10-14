import http from "../http-common"; 

class MovieDataService {
    getAllMovies(page = 1, limit = 10) {
        return http.get(`/movies?page=${page}&limit=${limit}`);
    }
    
    getAll() {
        return http.get(`/movies`);  // Endpoint API untuk mengambil semua film
    }
    
    searchMovies(keyword, page = 1, limit = 10) {
        return http.get(`/movies/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    }

    filterSortMovies(filters, sort, page = 1, limit = 10) {
        const params = {
            ...filters, 
            sort_by: sort, 
            page,
            limit
        };
        return http.get(`/movies/filter-sort`, { params });
    }

    getMovieById(id) {
        return http.get(`/movies/${id}`);
    }

    createMovie(data) {
        return http.post(`/movies`, data);
    }

    updateMovie(id, data) {
        return http.put(`/movies/${id}`, data);
    }

    deleteMovie(id) {
        return http.delete(`/movies/${id}`);
    }

    addToWishlist(movieId) {
        return http.post(`/movies/wishlist`, { movieId });
    }

    // New method for getting recommended movies
    getRecommendedMovies() {
        return http.get(`/movies/recommended`);
    }

}

const movieDataService = new MovieDataService();
export default movieDataService;
