import http from "../http-common";

class GenreDataService {
    getAll() {
        return http.get(`/genres`);
    }
    
    getById(id) {
        return http.get(`/genres/${id}`);
    }

    create(data) {
        return http.post(`/genres`, data);
    }

    update(id, data) {
        return http.put(`/genres/${id}`, data);
    }

    delete(id) {
        return http.delete(`/genres/${id}`);
    }
}

const genreDataService = new GenreDataService();
export default genreDataService;