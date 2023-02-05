<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Quản lý nhân viên</h4>
      <br />
      <router-link to="/user/add" class="row">
        <button class="btn btn-success" v-on:click="addUser()">Thêm</button>
      </router-link>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Họ và tên</th>
              <th>Password</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
              <th>Role</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" v-bind:key="user.userId">
              <td>{{ user.userId }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.password }}</td>
              <td>{{ user.address }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.status }}</td>
              <td>{{ user.roleName }}</td>
              <td>
                <a :href="'/user/' + user.userId" class="btn btn-primary"
                  >Sửa</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user-service";
export default {
  name: "userView",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    UserService.getListUsers().then(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        this.users =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
