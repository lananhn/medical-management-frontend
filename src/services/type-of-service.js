import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/type-of-service/';

class TypeOfService {
  getListTypeOfService() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createTypeOfService() {
    return axios.post(API_URL + 'add', { headers: authHeader() });
  }

  updateStatusTypeOfService(id) {
    return axios.put(API_URL + 'updateStatus' + id, { headers: authHeader() });
  }

  updateTypeOfServicer(id) {
    return axios.put(API_URL + 'update' + id, { headers: authHeader() });
  }
}

export default new TypeOfService();