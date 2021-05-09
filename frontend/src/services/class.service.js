import http from "../http-common"

class ClassDataService {

    getAll() {
        return http.get(`/clases`);
    }

    get(id) {
        return http.get(`/clases/${id}`);
    }

    createMember(data) {
        return http.post("/clases", data);
    }

    updateMember(id, data) {
        return http.put(`/clases/${id}`, data);
    }

    deleteMember(id) {
        return http.delete(`/clases/${id}`);
    }
    
}
    
export default new ClassDataService();