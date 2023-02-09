<template>
  <div class="container">
    <header class="jumbotron">
      <Form @submit="handleAdd" :validation-schema="schema">
        <div v-if="!submitted">
          <h4>Tạo kết quả khám / chữa bệnh</h4>
          <div class="mb-3">
            <label class="form-label">Kết quả</label>
            <Field
              name="result"
              type="text"
              class="form-control"
              v-model="result.result"
            />
            <ErrorMessage name="result" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Điều trị</label>
            <Field
              name="description"
              type="text"
              class="form-control"
              v-model="result.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã đăng ký dịch vụ</label>
            <Field
              name="serviceReg"
              type="text"
              class="form-control"
              v-model="result.serviceReg"
            />
            <ErrorMessage name="serviceReg" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã bác sỹ</label>
            <Field
              name="doctorId"
              type="text"
              class="form-control"
              v-model="result.doctorId"
            />
            <ErrorMessage name="doctorId" class="error-feedback" />
          </div>
          <div class="mb-3">
            <button
              @click="saveResult"
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
        <div v-else>
          <div class="alert alert-success" role="alert">Đã thêm thành công</div>
          <router-link to="/results" class="mb-3">
            <button class="btn btn-success">Quay lại</button>
          </router-link>
        </div>
      </Form>
    </header>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Result from "../services/results";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      result: yup.string().required("Kết quả cần được nhập"),
      description: yup.string().required("Điều trị cần được nhập"),
      serviceReg: yup.string().required("Mã đăng ký cần được nhập"),
      doctorId: yup.string().required("Mã bác sỹ cần được nhập"),
    });
    return {
      result: {
        result: "",
        description: "",
        serviceReg: "",
        doctorId: "",
        message: null,
      },
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    handleAdd(result) {
      this.message = "";
      this.submitted = false;
      this.loading = true;

      this.$store.dispatch("", result).then(
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
    saveResult() {
      var data = {
        result: this.result.result,
        description: this.result.description,
        serviceReg: this.result.serviceReg,
        doctorId: this.result.doctorId,
      };
      Result.createResults(data)
        .then((response) => {
          this.result.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
};
</script>

<style></style>
