import http from "../http-common";

class CommentDataService {
    getAll() {
        return http.get(`/comments`);
    }
    
    getById(id) {
        return http.get(`/comments/${id}`);
    }

    getByMovie(movie_id) {
        return http.get(`/comments/movie/${movie_id}`);
    }

    create(data) {
        return http.post(`/comments`, data);
    }

    update(id, data) {
        return http.put(`/comments/${id}`, data);
    }

    delete(id) {
        return http.delete(`/comments/${id}`);
    }
}

const commentDataService = new CommentDataService();
export default commentDataService;