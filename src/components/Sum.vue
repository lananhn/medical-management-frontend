<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách bệnh nhân</h4>
      <br />
      <input
        type="text"
        placeholder="Số điện thoại bệnh nhân"
        class="search-input"
        v-model="searchValue"
      />
      <br />
      <br />
      <div class="container" v-if="list.length">
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
              <th>Ngày cập nhật cuối</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in list" v-bind:key="patient.patientID">
              <td>{{ patient.patientID }}</td>
              <td>{{ patient.fullName }}</td>
              <td>{{ patient.gender }}</td>
              <td>{{ patient.birthday }}</td>
              <td>{{ patient.address }}</td>
              <td>{{ patient.phone }}</td>
              <td>{{ patient.insurance }}</td>
              <td>{{ patient.dateCreated }}</td>
              <td>
                <a :href="'/sums/' + patient.patientID" class="btn btn-primary"
                  >Thanh toán</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>Không có kết quả cho: {{ searchValue }}</div>
    </header>
  </div>
</template>

<script>
import PatientService from "../services/patient-service";
export default {
  name: "patientView",
  data() {
    return {
      searchValue: "",
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
  computed: {
    list() {
      if (this.searchValue.trim().length > 0) {
        return this.patients.filter((patient) =>
          patient.phone.includes(this.searchValue.trim())
        );
      }
      return this.patients;
    },
  },
};
</script>
