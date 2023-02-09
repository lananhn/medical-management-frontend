<template>
  <div class="container">
    <header class="jumbotron">
      <Form @submit="handleAdd" :validation-schema="schema">
        <div v-if="!submitted">
          <h4>Thêm bệnh nhân</h4>
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <Field
              name="fullName"
              type="text"
              class="form-control"
              v-model="patient.fullName"
            />
            <ErrorMessage name="fullName" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Giới tính</label>
            <Field
              name="gender"
              type="text"
              class="form-control"
              v-model="patient.gender"
            />
            <ErrorMessage name="gender" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Ngày sinh</label>
            <Field
              name="birthday"
              type="text"
              class="form-control"
              v-model="patient.birthday"
            />
            <ErrorMessage name="birthday" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" v-model="patient.address" />
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <Field
              name="phone"
              type="text"
              class="form-control"
              v-model="patient.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Bảo hiểm</label>
            <Field
              name="insurance"
              type="number"
              class="form-control"
              v-model="patient.insurance"
            />
            <ErrorMessage name="insurance" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã y tá</label>
            <Field
              name="nurseId"
              type="text"
              class="form-control"
              v-model="patient.nurseId"
            />
            <ErrorMessage name="nurseId" class="error-feedback" />
          </div>
          <div class="mb-3">
            <button
              @click="savePatient"
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
          <router-link to="/patients" class="mb-3">
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
import Patient from "../services/patient-service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      fullName: yup.string().required("Họ và tên cần được nhập"),
      gender: yup.string().required("Giới tính cần được nhập"),
      birthday: yup.string().required("Ngày sinh cần được nhập"),
      insurance: yup.string().required("Bảo hiểm cần được nhập"),
      nurseId: yup.string().required("Mã y tá cần được nhập"),
    });
    return {
      patient: {
        fullName: "",
        gender: "",
        birthday: "",
        address: "",
        phone: "",
        insurance: "",
        nurseId: "",
        message: null,
      },
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    handleAdd(patient) {
      this.message = "";
      this.submitted = false;
      this.loading = true;

      this.$store.dispatch("patients", patient).then(
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
    savePatient() {
      var data = {
        fullName: this.patient.fullName,
        gender: this.patient.gender,
        birthday: this.patient.birthday,
        address: this.patient.address,
        phone: this.patient.phone,
        insurance: this.patient.insurance,
        nurseId: this.patient.nurseId,
      };
      Patient.createPatient(data)
        .then((response) => {
          this.patient.id = response.data.id;
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
