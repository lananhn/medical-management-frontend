import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/patients/';

class PatientService {
  getListPatients() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createPatient(data) {
    return axios.post(API_URL + 'add', data, { headers: authHeader() });
  }

  updateInsurancePatient(id) {
    return axios.put(API_URL + 'insurance' + id, { headers: authHeader() });
  }

  updatePatient(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }
  
  getPatientById(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }
  
  getInForPatient(id) {
    return axios.get(API_URL + "infor/" + id , { headers: authHeader() });
  }
}

export default new PatientService();