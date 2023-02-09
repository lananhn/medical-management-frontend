<template>
  <div class="container">
    <Form @submit="handleAdd" :validation-schema="schema">
      <div v-if="!submitted">
        <h4>Thêm dịch vụ</h4>
        <div class="mb-3">
          <label class="form-label">Tên dịch vụ*</label>
          <Field
            name="name"
            type="text"
            class="form-control"
            v-model="service.name"
          />
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label class="form-label">Giá*</label>
          <Field
            name="price"
            type="text"
            class="form-control"
            v-model="service.price"
          />
          <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label class="form-label">Đơn vị*</label>
          <Field
            name="unit"
            type="text"
            class="form-control"
            v-model="service.unit"
          />
          <ErrorMessage name="unit" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã loại dịch vụ*</label>
          <Field
            name="typeOfService"
            type="text"
            class="form-control"
            v-model="service.typeOfService"
          />
          <ErrorMessage name="typeOfService" class="error-feedback" />
        </div>
        <div class="mb-3">
          <button
            @click="saveService"
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
        <div class="alert alert-success" role="alert">
          Đã thêm 1 dịch vụ mới
        </div>
        <router-link to="/services" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import Service from "../services/service";
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
      name: yup.string().required("Tên cần được nhập"),
      price: yup.string().required("Giá cần được nhập"),
      unit: yup.string().required("Đơn vị cần được nhập").max(20),
      typeOfService: yup.string().required("Mã cần được nhập"),
    });
    return {
      service: {
        name: "",
        price: "",
        unit: "",
        typeOfService: "",
        message: null,
      },
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    saveService() {
      var data = {
        name: this.service.name,
        price: this.service.price,
        unit: this.service.unit,
        typeOfService: this.service.typeOfService,
      };
      Service.createService(data)
        .then((response) => {
          this.service.id = response.data.id;
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
