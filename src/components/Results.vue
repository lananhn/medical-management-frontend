<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Kết quả khám bệnh</h4>
      <br />
      <router-link to="/results/add" class="row">
        <button class="btn btn-success" v-on:click="addResults()">Thêm</button>
      </router-link>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Kết quả</th>
              <th>Điều trị</th>
              <th>Tên dịch vụ</th>
              <th>Tên bệnh nhân</th>
              <th>Tên bác sỹ</th>
              <th>Ngày cập nhật cuối</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results" v-bind:key="result.resultsId">
              <td>{{ result.resultsId }}</td>
              <td>{{ result.result }}</td>
              <td>{{ result.description }}</td>
              <td>{{ result.serviceName }}</td>
              <td>{{ result.patientName }}</td>
              <td>{{ result.doctorName }}</td>
              <td>{{ result.dateCreated }}</td>
              <td>
                <a
                  :href="'/results/' + result.resultsId"
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
import Results from "../services/results";
export default {
  name: "resultsView",
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    Results.getListResults().then(
      (response) => {
        this.results = response.data;
      },
      (error) => {
        this.results =
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
