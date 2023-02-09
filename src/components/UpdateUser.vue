<template>
  <div class="container">
    <header class="jumbotron">
      <Form @submit="handleAdd" :validation-schema="schema">
        <div v-if="!submitted">
          <div v-if="currentUser">
            <div class="mb-3">
              <label class="form-label">Tên nhân viên</label>
              <Field
                name="name"
                type="text"
                class="form-control"
                v-model="currentUser.name"
              />
              <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="mb-3">
              <label class="form-label">Username</label>
              <Field
                name="userName"
                type="text"
                class="form-control"
                v-model="currentUser.name"
              />
              <ErrorMessage name="userName" class="error-feedback" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <Field
                name="passWord"
                type="text"
                class="form-control"
                v-model="currentUser.passWord"
              />
              <ErrorMessage name="passWord" class="error-feedback" />
            </div>
            <div class="mb-3">
              <label class="form-label">Role</label>
              <Field
                name="roles"
                type="text"
                class="form-control"
                v-model="currentUser.roles"
              />
              <ErrorMessage name="roles" class="error-feedback" />
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
                <Field
                  name="phone"
                  type="text"
                  class="form-control"
                  v-model="currentUser.phone"
                />
                <ErrorMessage name="phone" class="error-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label">Trạng thái</label>
                <Field
                  name="status"
                  type="text"
                  class="form-control"
                  v-model="currentUser.status"
                />
                <ErrorMessage name="status" class="error-feedback" />
              </div>
              <div class="mb-3">
                <button
                  @click="updateUser"
                  class="btn btn-success"
                  :disabled="loading"
                >
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span
                  >Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-success" role="alert">Đã Sửa</div>
          <router-link to="/user" class="mb-3">
            <button class="btn btn-success">Quay lại</button>
          </router-link>
        </div>
      </Form>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user-service";
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
      status: yup.string().required("Trạng thái cần được nhập"),
    });
    return {
      currentUser: null,
      message: "",
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    handleAdd(users) {
      this.message = "";
      this.submitted = false;
      this.loading = true;

      this.$store.dispatch("", users).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
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
