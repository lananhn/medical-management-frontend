<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Đăng ký khám/chữa bệnh</h4>
      <br />
      <router-link to="/serviceReg/add" class="row">
        <button class="btn btn-success add" v-on:click="addReg()">Thêm</button>
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
              <th>Số lượng</th>
              <th>Tên bệnh nhân</th>
              <th>Số điện thoại</th>
              <th>Tên dịch vụ</th>
              <th>Tên bác sỹ</th>
              <th>Ngày cập nhật cuối</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reg in list" v-bind:key="reg.regId">
              <td>{{ reg.regId }}</td>
              <td>{{ reg.quantity }}</td>
              <td>{{ reg.patientName }}</td>
              <td>{{ reg.phone }}</td>
              <td>{{ reg.serviceName }}</td>
              <td>{{ reg.doctorName }}</td>
              <td>{{ reg.dateCreated }}</td>
              <td>
                <a :href="'/serviceReg/' + reg.regId" class="btn btn-primary"
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
import Registration from "../services/registration-service";
export default {
  name: "serviceRegView",
  data() {
    return {
      searchValue: "",
      regs: [],
    };
  },
  mounted() {
    Registration.getListRegis().then(
      (response) => {
        this.regs = response.data;
      },
      (error) => {
        this.regs =
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
        return this.regs.filter((reg) =>
          reg.phone.includes(this.searchValue.trim())
        );
      }
      return this.regs;
    },
  },
};
</script>
