import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getListUsers() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createUser(data) {
    return axios.post(API_URL + 'addUser', data, { headers: authHeader() });
  }

  updateUser(id, data) {
    return axios.put(API_URL + 'update' + '/' + id, data, { headers: authHeader() });
  }
  
  getUser(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService();