import http from "../http-common";

class AwardDataService {
    getAll() {
        return http.get(`/awards`);
    }
    
    getById(id) {
        return http.get(`/awards/${id}`);
    }

    create(data) {
        return http.post(`/awards`, data);
    }

    update(id, data) {
        return http.put(`/awards/${id}`, data);
    }

    delete(id) {
        return http.delete(`/awards/${id}`);
    }
}

const awardDataService = new AwardDataService();
export default awardDataService;
