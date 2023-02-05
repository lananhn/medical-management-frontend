<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Tạo kết quả khám / chữa bệnh</h4>
        <div class="mb-3">
          <label class="form-label">Kết quả</label>
          <input type="text" class="form-control" v-model="result.result" />
        </div>
        <div class="mb-3">
          <label class="form-label">Điều trị</label>
          <input
            type="text"
            class="form-control"
            v-model="result.description"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã đăng ký dịch vụ</label>
          <input type="text" class="form-control" v-model="result.serviceReg" />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã bác sỹ</label>
          <input type="text" class="form-control" v-model="result.doctorId" />
        </div>
        <div class="mb-3">
          <button @click="saveResult" class="btn btn-success">Lưu</button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã thêm thành công</div>
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
      result: {
        result: "",
        description: "",
        serviceReg: "",
        doctorId: "",
        message: null,
      },
      submitted: false,
    };
  },
  methods: {
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
