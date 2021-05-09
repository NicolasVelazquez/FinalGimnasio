import http from "../http-common"

class MemberDataService {

    getAll() {
        return http.get(`/socios`);
    }

    get(id) {
        return http.get(`/socios/${id}`);
    }

    createMember(data) {
        return http.post("/socios", data);
    }

    updateMember(id, data) {
        return http.put(`/socios/${id}`, data);
    }

    deleteMember(id) {
        return http.delete(`/socios/${id}`);
    }
    
}
    
export default new MemberDataService();