<template>
  <div class="container">
    <h4>Quản lý Loại dịch vụ</h4>
    <br />
    <router-link to="/type-of-services/add" class="row">
      <button type="button" class="btn btn-success add">Thêm</button>
    </router-link>
    <br />
    <!-- <input
      type="text"
      placeholder="Tên loại dịch vụ"
      class="search-input"
      v-model="searchValue"
    /> -->
    <form class="d-flex" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="searchValue"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <br />
    <br />
    <div class="container" v-if="list.length">
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
          <tr v-for="typeOfService in list" v-bind:key="typeOfService.id">
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
    <div v-else>Không có kết quả cho: {{ searchValue }}</div>
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
<style>
.add {
  width: 70px;
}
@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css);
</style>
