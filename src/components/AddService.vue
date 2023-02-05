<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Thêm dịch vụ</h4>
        <div class="mb-3">
          <label class="form-label">Tên dịch vụ</label>
          <input type="text" class="form-control" v-model="service.name" />
        </div>
        <div class="mb-3">
          <label class="form-label">Giá</label>
          <input type="text" class="form-control" v-model="service.price" />
        </div>
        <div class="mb-3">
          <label class="form-label">Đơn vị</label>
          <input type="text" class="form-control" v-model="service.unit" />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã loại dịch vụ</label>
          <input
            type="text"
            class="form-control"
            v-model="service.typeOfService"
          />
        </div>
        <div class="mb-3">
          <button @click="saveService" class="btn btn-success">Lưu</button>
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
    </header>
  </div>
</template>

<script>
import Service from "../services/service";

export default {
  data() {
    return {
      service: {
        name: "",
        price: "",
        unit: "",
        typeOfService: "",
        message: null,
      },
      submitted: false,
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
          alert(e);
        });
    },
  },
};
</script>

<style></style>
