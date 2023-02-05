<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách dịch vụ</h4>
      <br />
      <div class="container">
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
            <tr v-for="service in services" v-bind:key="service.id">
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
    </header>
  </div>
</template>

<script>
import Service from "../services/service";
export default {
  name: "typeOfServiceView",
  data() {
    return {
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
};
</script>
