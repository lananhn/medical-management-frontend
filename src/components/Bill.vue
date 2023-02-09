<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Danh sách bản kê khám / chữa bệnh</h4>
      <br />
      <router-link to="/bills/add" class="row">
        <button class="btn btn-success add" v-on:click="addBill()">Thêm</button>
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
              <th>Tên bệnh nhân</th>
              <th>Số điện thoại</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Tên dịch vụ</th>
              <th>Tên kế toán</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Số tiền đã thu</th>
              <th>Ngày cập nhật cuối</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bill in list" v-bind:key="bill.billExId">
              <td>{{ bill.billExId }}</td>
              <td>{{ bill.patientName }}</td>
              <td>{{ bill.phone }}</td>
              <td>{{ bill.gender }}</td>
              <td>{{ bill.birthday }}</td>
              <td>{{ bill.serviceName }}</td>
              <td>{{ bill.accountantName }}</td>
              <td>{{ bill.unit }}</td>
              <td>{{ bill.quantity }}</td>
              <td>{{ bill.moneyReceived }}</td>
              <td>{{ bill.dateCreated }}</td>
              <td>
                <a :href="'/bills/' + bill.billExId" class="btn btn-primary"
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
import Bill from "../services/bill-service";
export default {
  name: "billsView",
  data() {
    return {
      searchValue: "",
      bills: [],
    };
  },
  mounted() {
    Bill.getListBill().then(
      (response) => {
        this.bills = response.data;
      },
      (error) => {
        this.bills =
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
        return this.bills.filter((bill) =>
          bill.phone.includes(this.searchValue.trim())
        );
      }
      return this.bills;
    },
  },
};
</script>
<style>
.add {
  width: 70px;
}
</style>
