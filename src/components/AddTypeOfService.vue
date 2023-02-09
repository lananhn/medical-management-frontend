<template>
  <div class="container">
    <Form @submit="handleAdd" :validation-schema="schema">
      <div v-if="!submitted">
        <h4>Thêm loại dịch vụ</h4>
        <div class="mb-3">
          <label class="form-label">Tên loại dịch vụ*</label>
          <Field
            name="name"
            type="text"
            class="form-control"
            v-model="typeOfService.name"
          />
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="mb-3">
          <button
            @click="saveTypeOfService"
            class="btn btn-success"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Lưu</span>
          </button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">
          Đã thêm 1 loại dịch vụ mới
        </div>
        <router-link to="/typeOfServices" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import TypeOfService from "../services/type-of-service";
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
    });
    return {
      typeOfService: {
        name: "",
        message: null,
      },
      loading: false,
      submitted: false,
      schema,
    };
  },
  methods: {
    saveTypeOfService() {
      var data = {
        name: this.typeOfService.name,
      };
      TypeOfService.createTypeOfService(data)
        .then((response) => {
          this.typeOfService.id = response.data.id;
          this.submitted = true;
        })
        // .catch(() => {
        //   this.$toast.error("Tên loại dịch vụ đã tồn tại");
        // });
        .catch((e) => {
          if (e.response.status === 404) {
            this.$toast.error("Tên loại dịch vụ đã tồn tại");
          }
        });
    },
  },
};
</script>

<style></style>
