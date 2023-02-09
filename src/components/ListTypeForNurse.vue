<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách loại dịch vụ</h4>
      <br />
      <input
        type="text"
        placeholder="Tên loại dịch vụ"
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
              <th>Tên loại dịch vụ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="typeOfService in list" v-bind:key="typeOfService.id">
              <td>{{ typeOfService.id }}</td>
              <td>{{ typeOfService.name }}</td>
              <td>{{ typeOfService.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>Không có kết quả cho: {{ searchValue }}</div>
    </header>
  </div>
</template>

<script>
import TypeOfService from "../services/type-of-service";
export default {
  name: "typeOfServiceView",
  data() {
    return {
      searchValue: "",
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
  computed: {
    list() {
      if (this.searchValue.trim().length > 0) {
        return this.typeOfServices.filter((typeOfService) =>
          typeOfService.name
            .toLowerCase()
            .includes(this.searchValue.trim().toLowerCase())
        );
      }
      return this.typeOfServices;
    },
  },
};
</script>
