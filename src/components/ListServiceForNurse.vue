<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách dịch vụ</h4>
      <br />
      <input
        type="text"
        placeholder="Tên dịch vụ"
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
              <th>Tên dịch vụ</th>
              <th>Giá</th>
              <th>Đơn vị</th>
              <th>Trạng thái</th>
              <th>Mã loại dịch vụ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in list" v-bind:key="service.id">
              <td>{{ service.id }}</td>
              <td>{{ service.name }}</td>
              <td>{{ service.price }}</td>
              <td>{{ service.unit }}</td>
              <td>{{ service.status }}</td>
              <td>{{ service.typeOfServiceId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>Không có kết quả cho: {{ searchValue }}</div>
    </header>
  </div>
</template>

<script>
import Service from "../services/service";
export default {
  name: "typeOfServiceView",
  data() {
    return {
      searchValue: "",
      services: [],
    };
  },
  mounted() {
    Service.getListServices().then(
      (response) => {
        this.services = response.data;
      },
      (error) => {
        this.services =
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
        return this.services.filter((service) =>
          service.name
            .toLowerCase()
            .includes(this.searchValue.trim().toLowerCase())
        );
      }
      return this.services;
    },
  },
};
</script>
