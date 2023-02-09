<template>
  <div class="container">
    <h4>Quản lý nhân viên</h4>
    <br />
    <router-link to="/user/add" class="row">
      <button class="btn btn-success add" v-on:click="addUser()">Thêm</button>
    </router-link>
    <br />
    <input
      type="text"
      placeholder="Số điện thoại"
      class="search-input"
      v-model="searchValue"
    />
    <br />
    <br />
    <div class="container" v-if="list.length">
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
          <tr v-for="user in list" v-bind:key="user.userId">
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
              <a :href="'/user/' + user.userId" class="btn btn-primary">Sửa</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Không có kết quả cho: {{ searchValue }}</div>
  </div>
</template>

<script>
import UserService from "../services/user-service";
export default {
  name: "userView",
  data() {
    return {
      searchValue: "",
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
  computed: {
    list() {
      if (this.searchValue.trim().length > 0) {
        return this.users.filter((user) =>
          user.phone.includes(this.searchValue.trim())
        );
      }
      return this.users;
    },
  },
};
</script>
<style>
.add {
  width: 70px;
}
</style>
