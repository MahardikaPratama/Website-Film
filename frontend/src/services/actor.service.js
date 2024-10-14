import http from "../http-common";

class ActorDataService {
    getAll() {
        return http.get(`/actors`);
    }
    
    getById(id) {
        return http.get(`/actors/${id}`);
    }

    getByMovie(movie_id) {
        return http.get(`/actors/movie/${movie_id}`);
    }
    
    create(data) {
        return http.post(`/actors`, data);
    }

    update(id, data) {
        return http.put(`/actors/${id}`, data);
    }

    delete(id) {
        return http.delete(`/actors/${id}`);
    }
}

const actorDataService = new ActorDataService();
export default actorDataService;