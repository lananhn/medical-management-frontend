<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentService">
          <div class="mb-3">
            <label class="form-label">Tên dịch vụ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentService.name"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Giá</label>
            <input
              type="text"
              class="form-control"
              v-model="currentService.price"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Đơn vị</label>
            <input
              type="text"
              class="form-control"
              v-model="currentService.unit"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Trạng thái</label>
            <input
              type="text"
              class="form-control"
              v-model="currentService.status"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã loại dịch vụ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentService.typeOfService"
            />
          </div>
          <div class="mb-3">
            <button @click="updateService" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
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
      currentService: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getService(id) {
      Service.getService(id)
        .then((response) => {
          this.currentService = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateService() {
      Service.updateService(this.currentService.id, this.currentService)
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
    this.getService(this.$route.params.id);
  },
};
</script>

<style></style>
