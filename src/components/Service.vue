<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Quản lý dịch vụ</h4>
      <br />
      <router-link to="/services/add" class="row">
        <button class="btn btn-success" v-on:click="addService()">Thêm</button>
      </router-link>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
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
              <th>Update</th>
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
              <td>
                <a :href="'/services/' + service.id" class="btn btn-primary"
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
import Service from "../services/service";
export default {
  name: "serviceView",
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
