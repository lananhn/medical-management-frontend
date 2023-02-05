import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/results-exam/';

class Results {
  getListResults() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createResults(data) {
    return axios.post(API_URL + 'add', data, { headers: authHeader() });
  }

  updateResult(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }
  
  getResultById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new Results();