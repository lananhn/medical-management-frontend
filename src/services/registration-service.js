import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/registration/';

class Registration {
  getListRegis() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createRegis() {
    return axios.post(API_URL + 'add', { headers: authHeader() });
  }

  updateStatusTypeOfService(id) {
    return axios.put(API_URL + 'updateStatus' + id, { headers: authHeader() });
  }

  listServiceRegisByPatient(patientId) {
    return axios.get(API_URL + 'listServiceRegis' + patientId, { headers: authHeader() });
  }
}

export default new Registration();