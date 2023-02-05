<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Thêm loại dịch vụ</h4>
        <div class="mb-3">
          <label class="form-label">Tên loại dịch vụ</label>
          <input
            type="text"
            class="form-control"
            v-model="typeOfService.name"
          />
        </div>
        <div class="mb-3">
          <button @click="saveTypeOfService" class="btn btn-success">
            Lưu
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
    </header>
  </div>
</template>

<script>
import TypeOfService from "../services/type-of-service";

export default {
  data() {
    return {
      typeOfService: {
        name: "",
        message: null,
      },
      submitted: false,
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
        .catch((e) => {
          alert(e);
        });
    },
  },
};
</script>

<style></style>
