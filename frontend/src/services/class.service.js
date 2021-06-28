import http from "../http-common"

class ClassDataService {

    getAll() {
        return http.get(`/clases`);
    }

    get(id) {
        return http.get(`/clases/${id}`);
    }

    createClass(data) {
        return http.post("/clases", data);
    }

    updateClass(id, data) {
        return http.put(`/clases/${id}`, data);
    }

    deleteClass(id) {
        return http.delete(`/clases/${id}`);
    }
    
}
    
export default new ClassDataService();