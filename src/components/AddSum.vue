<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Tạo bản tổng hợp chi phí khám / chữa bệnh</h4>
        <div v-if="currentPatient">
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.fullName"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Giới tính</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.gender"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Ngày sinh</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.birthday"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.address"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.phone"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Bảo hiểm</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.insurance"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã y tá</label>
            <input
              type="text"
              class="form-control"
              v-model="currentPatient.nurseId"
            />
          </div>
          <div class="mb-3">
            <button @click="updatePatient" class="btn btn-success">Lưu</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã Sửa</div>
        <router-link to="/patients" class="mb-3">
          <button class="btn btn-success">Quay lại</button>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import Patient from "../services/patient-service";

export default {
  data() {
    return {
      currentPatient: null,
      message: "",
      submitted: false,
    };
  },
  methods: {
    getPatient(id) {
      Patient.getPatientById(id)
        .then((response) => {
          this.currentPatient = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    updatePatient() {
      Patient.updatePatient(this.currentPatient.id, this.currentPatient)
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
    this.getPatient(this.$route.params.id);
  },
};
</script>

<style></style>
