<template>
  <div class="container">
    <Form @submit="handleAdd" :validation-schema="schema">
      <div v-if="!submitted">
        <h4>Thêm nhân viên</h4>
        <div class="mb-3">
          <label class="form-label">Username*</label>
          <Field
            name="userName"
            type="text"
            class="form-control"
            v-model="user.userName"
          />
          <ErrorMessage name="userName" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password*</label>
          <Field
            name="passWord"
            type="text"
            class="form-control"
            v-model="user.passWord"
          />
          <ErrorMessage name="passWord" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label class="form-label">Tên nhân viên*</label>
          <Field
            name="name"
            type="text"
            class="form-control"
            v-model="user.name"
          />
          <ErrorMessage name="name" class="error-feedback" />
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
          <label class="form-label">Số điện thoại*</label>
          <Field
            name="phone"
            type="text"
            class="form-control"
            v-model="user.phone"
          />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label class="form-label">Role*</label>
          <Field
            name="roles"
            type="text"
            class="form-control"
            v-model="user.roles"
          />
          <ErrorMessage name="roles" class="error-feedback" />
        </div>
        <div class="mb-3">
          <button @click="saveUser" class="btn btn-success" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span
            >Lưu
          </button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã thêm thành công</div>
        <router-link to="/user" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import User from "../services/user-service";
import Role from "../services/role-service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      userName: yup.string().required("Username cần được nhập"),
      passWord: yup.string().required("Password cần được nhập"),
      name: yup.string().required("Họ và tên cần được nhập"),
      phone: yup.string().required("Số điện thoại cần được nhập"),
      roles: yup.string().required("Role cần được nhập"),
    });
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
      loading: false,
      submitted: false,
      schema,
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
        roles: this.user.roles,
      };
      User.createUser(data)
        .then((response) => {
          this.user.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          if (e.response.status === 404) {
            this.$toast.error("Thông tin nhập chưa đúng");
          }
        });
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
}
</style>
