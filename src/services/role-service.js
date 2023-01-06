import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/roles/';

class RoleService {
  getListRoles() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createRole() {
    return axios.post(API_URL + 'add', { headers: authHeader() });
  }

  updateStatusRole(id) {
    return axios.put(API_URL + 'update-status' + id, { headers: authHeader() });
  }

  updateRole(id) {
    return axios.put(API_URL + 'update' + id, { headers: authHeader() });
  }
}

export default new RoleService();