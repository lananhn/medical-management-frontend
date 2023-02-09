<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Kết quả khám bệnh</h4>
      <br />
      <router-link to="/results/add" class="row">
        <button class="btn btn-success add" v-on:click="addResults()">
          Thêm
        </button>
      </router-link>
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
              <th>Kết quả</th>
              <th>Điều trị</th>
              <th>Tên dịch vụ</th>
              <th>Tên bệnh nhân</th>
              <th>Số điện thoại</th>
              <th>Tên bác sỹ</th>
              <th>Ngày cập nhật cuối</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in list" v-bind:key="result.resultsId">
              <td>{{ result.resultsId }}</td>
              <td>{{ result.result }}</td>
              <td>{{ result.description }}</td>
              <td>{{ result.serviceName }}</td>
              <td>{{ result.patientName }}</td>
              <td>{{ result.phone }}</td>
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
      <div v-else>Không có kết quả cho: {{ searchValue }}</div>
    </header>
  </div>
</template>

<script>
import Results from "../services/results";
export default {
  name: "resultsView",
  data() {
    return {
      searchValue: "",
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
  computed: {
    list() {
      if (this.searchValue.trim().length > 0) {
        return this.results.filter((result) =>
          result.phone.includes(this.searchValue.trim())
        );
      }
      return this.results;
    },
  },
};
</script>
