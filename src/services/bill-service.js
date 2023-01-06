import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/bills/';

class Bill {
  getListBill() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }

  createBill() {
    return axios.post(API_URL + 'add', { headers: authHeader() });
  }

  updateBill(id) {
    return axios.put(API_URL + 'update' + id, { headers: authHeader() });
  }

  updateSumBill(id) {
    return axios.put(API_URL + 'updateSum' + id, { headers: authHeader() });
  }

  updateStatusMoney(id) {
    return axios.put(API_URL + 'updateStatusMoney' + id, { headers: authHeader() });
  }
}

export default new Bill();