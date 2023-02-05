<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <div v-if="currentReg">
          <div class="mb-3">
            <label class="form-label">Mã bệnh nhân</label>
            <input
              type="text"
              class="form-control"
              v-model="currentReg.patientId"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã dịch vụ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentReg.serviceId"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã bác sỹ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentReg.doctorId"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Số lượng</label>
            <input
              type="number"
              class="form-control"
              v-model="currentReg.quantity"
            />
          </div>
          <div class="mb-3">
            <button @click="updateReg" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
        <router-link to="/servicesReg" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import Reg from "../services/registration-service";

export default {
  data() {
    return {
      currentReg: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getReg(id) {
      Reg.getRegById(id)
        .then((response) => {
          this.currentReg = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updateReg() {
      Reg.updateReg(this.currentReg.id, this.currentReg)
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
    this.getReg(this.$route.params.id);
  },
};
</script>

<style></style>
