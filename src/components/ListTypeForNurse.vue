<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách loại dịch vụ</h4>
      <br />
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên loại dịch vụ</th>
              <th>Trạng thái</th>
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
