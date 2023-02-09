<template>
  <div class="container">
    <header class="jumbotron">
      <Form @submit="handleAdd" :validation-schema="schema">
        <div v-if="!submitted">
          <h4>Đăng ký khám / chữa bệnh</h4>
          <div class="mb-3">
            <label class="form-label">Mã bệnh nhân</label>
            <Field
              name="patientId"
              type="text"
              class="form-control"
              v-model="reg.patientId"
            />
            <ErrorMessage name="patientId" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Tên dịch vụ</label>
            <div v-for="service in services" v-bind:key="service.id">
              <Field
                name="name"
                type="checkbox"
                v-bind:value="service.id"
                v-on:change="updateCheck"
              />{{ service.name }}
              <ErrorMessage name="name" class="error-feedback" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Mã bác sỹ</label>
            <Field
              name="doctorId"
              type="text"
              class="form-control"
              v-model="reg.doctorId"
            />
            <ErrorMessage name="doctorId" class="error-feedback" />
          </div>
          <div class="mb-3">
            <label class="form-label">Số lượng</label>
            <Field
              name="quantity"
              type="text"
              class="form-control"
              v-model="reg.quantity"
            />
            <ErrorMessage name="quantity" class="error-feedback" />
          </div>
          <div class="mb-3">
            <button
              @click="saveReg"
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
          <router-link to="/servicesReg" class="mb-3">
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
import Reg from "../services/registration-service";
import Service from "../services/service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      patientId: yup.string().required("Mã bệnh nhân cần được nhập"),
      name: yup.string().required("Tên dịch vụ cần được chọn"),
      doctorId: yup.string().required("Mã bác sỹ cần được nhập"),
      quantity: yup.string().required("Số lượng cần được nhập"),
    });
    return {
      reg: {
        patientId: "",
        doctorId: "",
        quantity: "",
        message: null,
      },
      services: [],
      serviceIds: [],
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    handleAdd(reg) {
      this.message = "";
      this.submitted = false;
      this.loading = true;

      this.$store.dispatch("", reg).then(
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
    getServices() {
      Service.getListServices().then((response) => {
        this.services = response.data;
      }),
        (error) => {
          this.services =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        };
    },
    saveReg() {
      var data = {
        patientId: this.reg.patientId,
        doctorId: this.reg.doctorId,
        quantity: this.reg.quantity,
        serviceId: this.serviceIds,
      };
      Reg.createRegis(data)
        .then((response) => {
          this.reg.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateCheck(e) {
      if (e.target.checked) {
        this.serviceIds.push(e.target.value);
      } else {
        var index = this.serviceIds.indexOf(e.target.value);
        if (index !== -1) {
          this.serviceIds.splice(index, 1);
        }
      }
    },
  },
  mounted() {
    this.getServices();
  },
};
</script>

<style></style>
