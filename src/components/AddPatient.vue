<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="!submitted">
        <h4>Thêm bệnh nhân</h4>
        <div class="mb-3">
          <label class="form-label">Họ và tên</label>
          <input type="text" class="form-control" v-model="patient.fullName" />
        </div>
        <div class="mb-3">
          <label class="form-label">Giới tính</label>
          <input type="text" class="form-control" v-model="patient.gender" />
        </div>
        <div class="mb-3">
          <label class="form-label">Ngày sinh</label>
          <input type="text" class="form-control" v-model="patient.birthday" />
        </div>
        <div class="mb-3">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" v-model="patient.address" />
        </div>
        <div class="mb-3">
          <label class="form-label">Số điện thoại</label>
          <input type="text" class="form-control" v-model="patient.phone" />
        </div>
        <div class="mb-3">
          <label class="form-label">Bảo hiểm</label>
          <input
            type="number"
            class="form-control"
            v-model="patient.insurance"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Mã y tá</label>
          <input type="text" class="form-control" v-model="patient.nurseId" />
        </div>
        <div class="mb-3">
          <button @click="savePatient" class="btn btn-success">Lưu</button>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">Đã thêm thành công</div>
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
      patient: {
        fullName: "",
        gender: "",
        birthday: "",
        address: "",
        phone: "",
        insurance: "",
        nurseId: "",
        message: null,
      },
      submitted: false,
    };
  },
  methods: {
    savePatient() {
      var data = {
        fullName: this.patient.fullName,
        gender: this.patient.gender,
        birthday: this.patient.birthday,
        address: this.patient.address,
        phone: this.patient.phone,
        insurance: this.patient.insurance,
        nurseId: this.patient.nurseId,
      };
      Patient.createPatient(data)
        .then((response) => {
          this.patient.id = response.data.id;
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
