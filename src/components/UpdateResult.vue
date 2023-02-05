<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentResult">
          <div class="mb-3">
            <label class="form-label">Kết quả</label>
            <input
              type="text"
              class="form-control"
              v-model="currentResult.result"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Điều trị</label>
            <input
              type="text"
              class="form-control"
              v-model="currentResult.description"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã đăng ký dịch vụ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentResult.serviceReg"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã bác sỹ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentResult.doctorId"
            />
          </div>
          <div class="mb-3">
            <button @click="updateResult" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
        <router-link to="/results" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import Result from "../services/results";

export default {
  data() {
    return {
      currentResult: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getResult(id) {
      Result.getResultById(id)
        .then((response) => {
          this.currentResult = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateResult() {
      Result.updateResult(this.currentResult.id, this.currentResult)
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
    this.getResult(this.$route.params.id);
  },
};
</script>

<style></style>
