<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Quản lý bệnh nhân</h4>
      <br />
      <router-link to="/patients/add" class="row">
        <button class="btn btn-success" v-on:click="addPatient()">Thêm</button>
      </router-link>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Bảo hiểm y tế</th>
              <th>Tên y tá</th>
              <th>Ngày cập nhật cuối</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" v-bind:key="patient.patientID">
              <td>{{ patient.patientID }}</td>
              <td>{{ patient.fullName }}</td>
              <td>{{ patient.gender }}</td>
              <td>{{ patient.birthday }}</td>
              <td>{{ patient.address }}</td>
              <td>{{ patient.phone }}</td>
              <td>{{ patient.insurance }}</td>
              <td>{{ patient.nurseName }}</td>
              <td>{{ patient.dateCreated }}</td>
              <td>
                <a
                  :href="'/patients/' + patient.patientID"
                  class="btn btn-primary"
                  >Sửa</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  </div>
</template>

<script>
import PatientService from "../services/patient-service";
export default {
  name: "patientView",
  data() {
    return {
      patients: [],
    };
  },
  mounted() {
    PatientService.getListPatients().then(
      (response) => {
        this.patients = response.data;
      },
      (error) => {
        this.patients =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
