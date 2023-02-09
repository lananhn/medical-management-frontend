<template>
  <div class="container">
    <h4>Quản lý dịch vụ</h4>
    <br />
    <router-link to="/services/add" class="row">
      <button class="btn btn-success add" v-on:click="addService()">
        Thêm
      </button>
    </router-link>
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
            <th>Update</th>
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
            <td>
              <a :href="'/services/' + service.id" class="btn btn-primary"
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
import Service from "../services/service";
export default {
  name: "serviceView",
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
<style>
.add {
  width: 70px;
}
</style>
