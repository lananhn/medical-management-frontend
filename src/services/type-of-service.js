import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/type-of-service/';

class TypeOfService {
  getListTypeOfService() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createTypeOfService(data) {
    return axios.post(API_URL + 'add', data, { headers: authHeader() });
  }

  updateStatusTypeOfService(id) {
    return axios.put(API_URL + 'updateStatus' + id, { headers: authHeader() });
  }

  updateTypeOfServicer(id, data) {
    return axios.put(API_URL + 'update' + '/' + id, data, { headers: authHeader() });
  }

  getTypeOfService(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new TypeOfService();