<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentUser">
          <div class="mb-3">
            <label class="form-label">Tên nhân viên</label>
            <input
              type="text"
              class="form-control"
              v-model="currentUser.name"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input
              type="text"
              class="form-control"
              v-model="currentUser.passWord"
            />
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
            <label class="form-label">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentUser.address"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              v-model="currentUser.email"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              v-model="currentUser.phone"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Trạng thái</label>
            <input
              type="text"
              class="form-control"
              v-model="currentUser.status"
            />
          </div>
          <div class="mb-3">
            <button @click="updateUser" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
        <router-link to="/user" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user-service";

export default {
  data() {
    return {
      currentUser: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getUser(id) {
      UserService.getUser(id)
        .then((response) => {
          this.currentUser = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateUser() {
      UserService.updateUser(this.currentUser.id, this.currentUser)
        .then(() => {
          this.message = "Đã sửa";
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>

<style></style>
