import http from "../http-common";

class MovieDataService {
    getAllMovies(page = 1, limit = 10) {
        return http.get(`/movies?page=${page}&limit=${limit}`);
    }
    
    searchMovies(keyword, page = 1, limit = 10) {
        return http.get(`/movies/search`, { params: { keyword, page, limit } });
    }

    filterSortMovies(filters, sort, page = 1, limit = 10) {
        return http.get(`/movies/filter-sort`, { params: { filters, sort, page, limit } });
    }

    filterMoviesByCountry(country, page = 1, limit = 10) {
        return http.get(`/movies/filter-country`, { params: { country, page, limit } });
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

export default new MovieDataService();
