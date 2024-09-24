import http from "../http-common";

class MovieDataService {
    getAllMovies(page = 1, limit = 10) {
        return http.get(`/movies?page=${page}&limit=${limit}`);
    }
    
    searchMovies(keyword, page = 1, limit = 10) {
        return http.get(`/movies/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    }
    

    filterSortMovies(filters, sort, page = 1, limit = 10) {
        // Menyiapkan parameter query
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
}

const movieDataService = new MovieDataService();
export default movieDataService;
