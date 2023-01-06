import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/services/';

class Service {
  getListServices() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createService() {
    return axios.post(API_URL + 'add', { headers: authHeader() });
  }

  updateStatusService(id) {
    return axios.put(API_URL + 'updateStatus' + id, { headers: authHeader() });
  }

  updateServicer(id) {
    return axios.put(API_URL + 'update' + id, { headers: authHeader() });
  }
}

export default new Service();