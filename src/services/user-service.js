import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getListUsers() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createUser() {
    return axios.post(API_URL + 'addUser', { headers: authHeader() });
  }

  updateStatusUser(id) {
    return axios.put(API_URL + 'status' + id, { headers: authHeader() });
  }

  updateUser(id) {
    return axios.put(API_URL + 'update' + id, { headers: authHeader() });
  }
}

export default new UserService();