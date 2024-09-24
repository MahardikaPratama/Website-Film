import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get(`/users`);
    }
    
    getById(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post(`/users`, data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
}

const userDataService = new UserDataService();
export default userDataService;