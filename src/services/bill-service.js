import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/bills/';

class Bill {
  getListBill() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createBill(data) {
    return axios.post(API_URL + 'add', data, { headers: authHeader() });
  }

  updateBill(id, data) {
    return axios.put(API_URL + 'update/' + id, data, { headers: authHeader() });
  }

  updateSum(id, data) {
    return axios.put(API_URL + 'updateSum/' + id, data, { headers: authHeader() });
  }

  updateStatusMoney(id) {
    return axios.put(API_URL + 'updateStatusMoney' + id, { headers: authHeader() });
  }

  getBillById(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }

  getSumById(id) {
    return axios.get(API_URL + 'sums/' + id , { headers: authHeader() });
  }

  getSumListByPatientId(id) {
    return axios.get(API_URL + 'patients/' + id , { headers: authHeader() });
  }

  getSum(id) {
    return axios.get(API_URL + 'sum/' + id , { headers: authHeader() });
  }
}

export default new Bill();