<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Quản lý Loại dịch vụ</h4>
      <br />
      <router-link to="/type-of-services/add" class="row">
        <button class="btn btn-success" v-on:click="addTypeOfService()">
          Thêm
        </button>
      </router-link>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên loại dịch vụ</th>
              <th>Trạng thái</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="typeOfService in typeOfServices"
              v-bind:key="typeOfService.id"
            >
              <td>{{ typeOfService.id }}</td>
              <td>{{ typeOfService.name }}</td>
              <td>{{ typeOfService.status }}</td>
              <td>
                <a
                  :href="'/type-of-services/' + typeOfService.id"
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
import TypeOfService from "../services/type-of-service";
export default {
  name: "typeOfServiceView",
  data() {
    return {
      typeOfServices: [],
    };
  },
  mounted() {
    TypeOfService.getListTypeOfService().then(
      (response) => {
        this.typeOfServices = response.data;
      },
      (error) => {
        this.typeOfServices =
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
