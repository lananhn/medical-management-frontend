import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/services/';

class Service {
  getListServices() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createService(data) {
    return axios.post(API_URL + 'add', data, { headers: authHeader() });
  }

  updateStatusService(id) {
    return axios.put(API_URL + 'updateStatus' + id, { headers: authHeader() });
  }

  updateService(id, data) {
    return axios.put(API_URL + 'update' + '/' + id, data, { headers: authHeader() });
  }
  getService(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new Service();