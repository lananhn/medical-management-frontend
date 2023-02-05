import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/registration/';

class Registration {
  getListRegis() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createRegis(data) {
    return axios.post(API_URL + 'add', data, { headers: authHeader() });
  }

  updateReg(id, data) {
    return axios.put(API_URL + 'update/' + id, data, { headers: authHeader() });
  }

  listServiceRegisByPatient(patientId) {
    return axios.get(API_URL + 'listServiceRegis/' + patientId, { headers: authHeader() });
  }

  getRegById(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }
}

export default new Registration();