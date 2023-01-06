import axios from 'axios';

const API_URL = 'http://localhost:8080/api/login/';

class AuthService {

  getPublicContent() {
    return axios.get(API_URL + '');
  }

  login(user) {
    return axios
      .post(API_URL + '', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

}

export default new AuthService();