<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Thêm nhân viên</h4>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" v-model="user.userName" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="text" class="form-control" v-model="user.passWord" />
        </div>
        <div class="mb-3">
          <label class="form-label">Tên nhân viên</label>
          <input type="text" class="form-control" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" v-model="user.address" />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="text" class="form-control" v-model="user.email" />
        </div>
        <div class="mb-3">
          <label class="form-label">Số điện thoại</label>
          <input type="text" class="form-control" v-model="user.phone" />
        </div>
        <!-- <div class="mb-3">
          <label class="form-label">Role</label>
          <div v-for="role in roles" v-bind:key="role.name">
            <input
              type="checkbox"
              v-bind:value="role.name"
              v-on:change="updateCheck"
            />{{ role.name }}
          </div>
        </div> -->
        <div class="mb-3">
          <label class="form-label">Role</label>
          <input type="text" class="form-control" v-model="user.roles" />
        </div>
        <div class="mb-3">
          <button @click="saveUser" class="btn btn-success">Lưu</button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã thêm thành công</div>
        <router-link to="/user" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import User from "../services/user-service";
import Role from "../services/role-service";

export default {
  data() {
    return {
      user: {
        userName: "",
        passWord: "",
        name: "",
        address: "",
        email: "",
        phone: "",
        roles: "",
        message: null,
      },
      // roles: [],
      // roleNames: [],
      submitted: false,
    };
  },
  methods: {
    getRoles() {
      Role.getListRoles().then((response) => {
        this.roles = response.data;
      }),
        (error) => {
          this.roles =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        };
    },
    saveUser() {
      var data = {
        userName: this.user.userName,
        passWord: this.user.passWord,
        name: this.user.name,
        address: this.user.address,
        email: this.user.email,
        phone: this.user.phone,
        // roles: this.roleNames,
        roles: this.user.roles,
      };
      User.createUser(data)
        .then((response) => {
          this.user.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
    // updateCheck(e) {
    //   if (e.target.checked) {
    //     this.roleNames.push(e.target.value);
    //   } else {
    //     var index = this.roleNames.indexOf(e.target.value);
    //     if (index !== -1) {
    //       this.roleNames.splice(index, 1);
    //     }
    //   }
    // },
  },
  // mounted() {
  //   this.getRoles();
  // },
};
</script>

<style></style>
