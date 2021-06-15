import http from "../http-common"

class PaymentDataService {

    getAll() {
        return http.get(`/abonos`);
    }

    get(id) {
        return http.get(`/abonos/${id}`);
    }

    createPayment(data) {
        return http.post("/abonos", data);
    }

}
    
export default new PaymentDataService();