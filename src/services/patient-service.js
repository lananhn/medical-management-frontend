import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/patients/';

class PatientService {
  getListPatients() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createPatient() {
    return axios.post(API_URL + 'add', { headers: authHeader() });
  }

  updateInsurancePatient(id) {
    return axios.put(API_URL + 'insurance' + id, { headers: authHeader() });
  }

  updatePatient(id) {
    return axios.put(API_URL + id, { headers: authHeader() });
  }
}

export default new PatientService();