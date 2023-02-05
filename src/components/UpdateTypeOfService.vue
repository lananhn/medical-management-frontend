<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentTypeOfService">
          <div class="mb-3">
            <label class="form-label">Tên loại dịch vụ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentTypeOfService.name"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Trạng thái</label>
            <input
              type="text"
              class="form-control"
              v-model="currentTypeOfService.status"
            />
          </div>
          <div class="mb-3">
            <button @click="updateTypeOfService" class="btn btn-success">
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
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
      currentTypeOfService: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getTypeOfService(id) {
      TypeOfService.getTypeOfService(id)
        .then((response) => {
          this.currentTypeOfService = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateTypeOfService() {
      TypeOfService.updateTypeOfServicer(
        this.currentTypeOfService.id,
        this.currentTypeOfService
      )
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
    this.getTypeOfService(this.$route.params.id);
  },
};
</script>

<style></style>
